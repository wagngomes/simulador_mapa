from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
from prophet import Prophet

app = FastAPI()

class ForecastItem(BaseModel):
    ds: str        # Data
    y: float       # Quantidade
    cd: str        # Código do CD
    codigo_produto: str  # Código do Produto

class ForecastRequest(BaseModel):
    items: List[ForecastItem]

@app.post("/forecast")
def forecast(request: ForecastRequest):
    try:
        # Converte para DataFrame
        df = pd.DataFrame([item.dict() for item in request.items])
        df['ds'] = pd.to_datetime(df['ds'])

        forecasts = []

        # Agrupa por CD e Código do Produto
        grouped = df.groupby(['cd', 'codigo_produto'])

        for (cd_value, produto_value), group in grouped:
            df_group = group[['ds', 'y']].sort_values('ds')

            model = Prophet()
            model.fit(df_group)

            future = model.make_future_dataframe(periods=6, freq='MS')  # 12 meses
            forecast = model.predict(future)

            forecast_result = forecast[['ds', 'yhat']].tail(6)

            # Monta o resultado para este grupo
            for _, row in forecast_result.iterrows():
                forecasts.append({
                    "cd": cd_value,
                    "codigo_produto": produto_value,
                    "data": row['ds'].strftime('%Y-%m-%d'),
                    "previsao": max(0, round(row['yhat'], 0))
                })

        return {"forecasts": forecasts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
