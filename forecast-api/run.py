from consumer import RabbitMQConsumer

if __name__ == "__main__":
    consumer = RabbitMQConsumer()
    consumer.start()