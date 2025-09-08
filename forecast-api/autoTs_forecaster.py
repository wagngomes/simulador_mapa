import pandas as pd
from autots import AutoTS
from publisher import forecastApiPublisher
from sqlalchemy import create_engine
import psycopg2

# Configuração PostgreSQL com SQLAlchemy
DB_USER = "docker"
DB_PASSWORD = "docker"
DB_HOST = "localhost"
DB_PORT = 5483
DB_NAME = "forecast_api"

ENGINE = create_engine(f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")

def gerar_previsoes(msg):
    # 1️⃣ Validar mensagem
    if not isinstance(msg, dict) or "items" not in msg or "cenario_id" not in msg:
        raise ValueError("Formato inválido de mensagem: esperava chaves 'items' e 'cenario_id'")

    df = pd.DataFrame(msg["items"])
    cenario_id = msg["cenario_id"]
    print("Colunas recebidas:", df.columns.tolist())

    # 2️⃣ Preparar dados
    df["series_id"] = df["codigo_produto"].astype(str) + "_" + df["cd"].astype(str)
    df = df.rename(columns={"ds": "datetime", "y": "value"})
    df["datetime"] = pd.to_datetime(df["datetime"], dayfirst=True)

    # Notificar início
    forecastApiPublisher.send_status({"import_id": cenario_id, "status": "processing"})

    # 3️⃣ Treinar AutoTS
    model = AutoTS(
        forecast_length=6,
        frequency="MS",
        prediction_interval=0.9,
        ensemble=None,
        model_list="default",
        transformer_list="superfast",
        drop_most_recent=1,
        max_generations=4,
        num_validations=2,
        validation_method="backwards"
    )

    model = model.fit(df, date_col="datetime", value_col="value", id_col="series_id")

    # 4️⃣ Gerar forecast
    prediction = model.predict()
    forecast_df = prediction.forecast.reset_index().melt(id_vars=["index"], var_name="series_id", value_name="forecast")
    forecast_df = forecast_df.rename(columns={"index": "datetime"})

    upper_df = prediction.upper_forecast.reset_index().melt(id_vars=["index"], var_name="series_id", value_name="upper_forecast")
    upper_df = upper_df.rename(columns={"index": "datetime"})

    lower_df = prediction.lower_forecast.reset_index().melt(id_vars=["index"], var_name="series_id", value_name="lower_forecast")
    lower_df = lower_df.rename(columns={"index": "datetime"})

    # Converter datas
    forecast_df["datetime"] = pd.to_datetime(forecast_df["datetime"])
    upper_df["datetime"] = pd.to_datetime(upper_df["datetime"])
    lower_df["datetime"] = pd.to_datetime(lower_df["datetime"])

    # Filtrar apenas previsões futuras
    ultima_data = df["datetime"].max()
    forecast_df = forecast_df[forecast_df["datetime"] > ultima_data]
    upper_df = upper_df[upper_df["datetime"] > ultima_data]
    lower_df = lower_df[lower_df["datetime"] > ultima_data]

    # Merge forecast + upper + lower
    forecast_merged = forecast_df.merge(upper_df, on=["datetime", "series_id"])
    forecast_merged = forecast_merged.merge(lower_df, on=["datetime", "series_id"])
    forecast_merged["scenario_id"] = cenario_id
    forecast_merged["is_forecast"] = True
    forecast_merged = forecast_merged.rename(columns={"forecast": "value"})

    # 5️⃣ Preparar histórico
    hist_df = df.copy()
    hist_df["scenario_id"] = cenario_id
    hist_df["upper_forecast"] = None
    hist_df["lower_forecast"] = None
    hist_df["is_forecast"] = False
    hist_df = hist_df.rename(columns={"value": "value", "datetime": "datetime", "series_id": "series_id"})

    # 6️⃣ Concatenar histórico + forecast
    full_df = pd.concat([hist_df, forecast_merged], ignore_index=True)

    # 7️⃣ Salvar no PostgreSQL usando pandas.to_sql
    # Cria tabela se não existir e insere os dados
    full_df.to_sql(
        "forecast_full",
        con=ENGINE,
        if_exists="append",  # adiciona novos registros sem apagar os antigos
        index=False,
        method="multi"       # insere em batches, mais rápido
    )

    # 8️⃣ Notificar conclusão
    forecastApiPublisher.send_status({"import_id": cenario_id, "status": "completed"})

    # 9️⃣ Retornar resultados opcionais
    return {
        "forecast_long": forecast_df,
        "upper_long": upper_df,
        "lower_long": lower_df,
        "model_results": model.results(),
        "validation_results": model.results("validation")
    }
