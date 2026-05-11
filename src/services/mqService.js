const { getChannel } = require('../config/rabbitmq');

const mqService = {
  async sendMessage(queue, message) {
    try {
      const channel = getChannel();
      if (!channel) {
        console.error('RabbitMQ channel not established. Message not sent:', message);
        return;
      }

      await channel.assertQueue(queue, {
        durable: true,
      });

      return channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        persistent: true,
      });
    } catch (error) {
      console.error('Failed to send message to RabbitMQ:', error.message);
    }
  },
};

module.exports = mqService;
