const amqp = require('amqplib');

let connection;
let channel;

const connectRabbitMQ = async () => {
  try {
    const rabbitHost = process.env.RABBITMQ_HOST || 'localhost';
    const rabbitPort = process.env.RABBITMQ_PORT || 5672;
    const rabbitUser = process.env.RABBITMQ_USER || 'guest';
    const rabbitPass = process.env.RABBITMQ_PASSWORD || 'guest';
    
    // amqp://user:pass@host:port
    const amqpUrl = process.env.AMQP_URL || `amqp://${rabbitUser}:${rabbitPass}@${rabbitHost}:${rabbitPort}`;
    
    connection = await amqp.connect(amqpUrl);
    channel = await connection.createChannel();
    
    console.log('Connected to RabbitMQ');
    
    connection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err);
    });
    
    connection.on('close', () => {
      console.error('RabbitMQ connection closed. Attempting to reconnect...');
      setTimeout(connectRabbitMQ, 5000);
    });

  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    setTimeout(connectRabbitMQ, 5000);
  }
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };
