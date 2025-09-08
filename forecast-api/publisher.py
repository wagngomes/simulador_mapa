import pika
import json

class ForecastApiPublisher:
    def __init__(self) -> None:
        self.__host = "localhost"
        self.__port = 5672
        self.__username = "guest"
        self.__password = "guest"
        self.__exchange = ""  # default exchange
        self.__routing_key = "simulationStatus"  # nome da fila

        # cria conexão
        credentials = pika.PlainCredentials(self.__username, self.__password)
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host=self.__host, port=self.__port, credentials=credentials)
        )
        self.__channel = connection.channel()

    def send_status(self, body: dict):
        self.__channel.basic_publish(
            exchange=self.__exchange,
            routing_key=self.__routing_key,
            body=json.dumps(body),
            properties=pika.BasicProperties(
                delivery_mode=2  # mensagem persistente
            )   
        )
        print(f"Mensagem enviada para '{self.__routing_key}': {body}")

# exemplo de uso
forecastApiPublisher = ForecastApiPublisher()
