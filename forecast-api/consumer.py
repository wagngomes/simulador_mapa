import pika
import json
from autoTs_forecaster import gerar_previsoes

def rabbitmq_callback(ch, method, properties, body):
    msg = body.decode('utf-8')
    formatted_msg = json.loads(msg)
    print(formatted_msg)
    gerar_previsoes(formatted_msg)

class RabbitMQConsumer:
    def __init__(self) -> None:
        self.__host = "localhost"
        self.__port = 5672
        self.__username = "guest"
        self.__password = "guest"
        self.__queue = "historicData"
        self.__channel = self.create_channel()
    
    def create_channel(self):
        connection_parameters = pika.ConnectionParameters(
            host=self.__host,
            port=self.__port,
            credentials=pika.PlainCredentials(
                username=self.__username,
                password=self.__password
            )
        )

        channel = pika.BlockingConnection(connection_parameters).channel()
        channel.queue_declare(
            queue=self.__queue,
            durable=True
        )
        channel.basic_consume(
            queue=self.__queue,
            auto_ack=True,
            on_message_callback=rabbitmq_callback
        )
        return channel
    
    def start(self):
        print('sistema conectado ao RabbitMQ')
        self.__channel.start_consuming()

