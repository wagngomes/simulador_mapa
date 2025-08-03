import pandas as pd
from autots import AutoTS

def gerar_previsoes(msg):
    
    if isinstance(msg, dict) and "items" in msg:
        df = pd.DataFrame(msg["items"])
    else:
        raise ValueError("Formato inválido de mensagem: esperava chave 'items'")

    print("Colunas recebidas:", df.columns.tolist())

    
    df["series_id"] = df["codigo_produto"].astype(str) + "_" + df["cd"].astype(str)
    df = df.rename(columns={
        "ds": "datetime",
        "y": "value",
    })

    # 🤖 Treinar o modelo
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

    model = model.fit(
        df,
        date_col="datetime",
        value_col="value",
        id_col="series_id"
    )

    # 🔮 Prever
    prediction = model.predict()
    forecasts_df = prediction.forecast
    upper_df = prediction.upper_forecast
    lower_df = prediction.lower_forecast

    # 🔁 Converter para formato long
    forecast_long = forecasts_df.reset_index().melt(id_vars=["index"], var_name="series_id", value_name="forecast")
    forecast_long = forecast_long.rename(columns={"index": "datetime"})

    upper_long = upper_df.reset_index().melt(id_vars=["index"], var_name="series_id", value_name="upper_forecast")
    upper_long = upper_long.rename(columns={"index": "datetime"})

    lower_long = lower_df.reset_index().melt(id_vars=["index"], var_name="series_id", value_name="lower_forecast")
    lower_long = lower_long.rename(columns={"index": "datetime"})

    # 📊 Obter resultados dos modelos
    model_results = model.results()
    validation_results = model.results("validation")

    print(forecast_long)

    return {
        "forecast_long": forecast_long,
        "upper_long": upper_long,
        "lower_long": lower_long,
        "model_results": model_results,
        "validation_results": validation_results
    }
