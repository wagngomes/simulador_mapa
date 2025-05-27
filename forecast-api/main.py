from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
from prophet import Prophet
from scipy import stats

app = FastAPI()

class ForecastItem(BaseModel):
    ds: str               # Data (formato: YYYY-MM-DD)
    y: float              # Quantidade
    cd: str               # Código do CD
    codigo_produto: str   # Código do Produto

class ForecastRequest(BaseModel):
    items: List[ForecastItem]

@app.post("/forecast")
def forecast(request: ForecastRequest):
    try:
        # Converte entrada para DataFrame
        df = pd.DataFrame([item.dict() for item in request.items])
        df['ds'] = pd.to_datetime(df['ds'])

        # Remove duplicatas por (cd, produto, data)
        df = df.drop_duplicates(subset=['cd', 'codigo_produto', 'ds'])

        forecasts = []

        # Agrupa por CD e Código do Produto
        grouped = df.groupby(['cd', 'codigo_produto'])

        for (cd_value, produto_value), group in grouped:
            df_group = group[['ds', 'y']].copy()

            # Força frequência mensal (MS = mês no início)
            df_group = df_group.set_index('ds').resample('MS').sum().reset_index()

            if len(df_group) < 2:
                print(f"Ignorando grupo ({cd_value}, {produto_value}) - dados insuficientes.")
                continue
            
            df_group = df_group[(stats.zscore(df_group['y']) < 1.0)]
            model = Prophet()
            model.fit(df_group[['ds', 'y']])

            last_date = df_group['ds'].max().replace(day=1)
            future = model.make_future_dataframe(periods=6, freq='MS')
            forecast = model.predict(future)

            forecast_result = forecast[forecast['ds'] > last_date][['ds', 'yhat']]

            # Calcula média dos últimos 3 períodos
            ultimos_3 = df_group.tail(3)
            media_ultimos_3 = ultimos_3['y'].mean() if not ultimos_3.empty else 0

            for _, row in forecast_result.iterrows():
                previsao = row['yhat']
                # Se previsão for zero ou muito próxima de zero (tolerância de 0.01)
                if abs(previsao) <= 0:
                    previsao = media_ultimos_3

                forecasts.append({
                    "cd": cd_value,
                    "codigo_produto": produto_value,
                    "data": row['ds'].strftime('%Y-%m-%d'),
                    "previsao": round(previsao, 0)
                })

        return {"forecasts": forecasts}

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
