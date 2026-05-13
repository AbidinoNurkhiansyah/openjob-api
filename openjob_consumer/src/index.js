require('dotenv').config();
const amqp = require('amqplib');
const nodemailer = require('nodemailer');
const pool = require('./config/database');

const init = async () => {
  const rabbitHost = process.env.RABBITMQ_HOST || 'localhost';
  const rabbitPort = process.env.RABBITMQ_PORT || 5672;
  const rabbitUser = process.env.RABBITMQ_USER || 'guest';
  const rabbitPass = process.env.RABBITMQ_PASSWORD || 'guest';
  const amqpUrl = process.env.AMQP_URL || `amqp://${rabbitUser}:${rabbitPass}@${rabbitHost}:${rabbitPort}`;

  const connection = await amqp.connect(amqpUrl);
  const channel = await connection.createChannel();

  const queue = 'application:create';
  await channel.assertQueue(queue, { durable: true });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  console.log(`Consumer started, listening on queue: ${queue}`);

  channel.consume(queue, async (message) => {
    try {
      const content = JSON.parse(message.content.toString());
      const { application_id } = content;

      console.log(`Processing application: ${application_id}`);

      // Fetch details directly from DB
      const query = {
        text: `
          SELECT 
            applications.id,
            applications.created_at AS application_date,
            applicant.name AS applicant_name,
            applicant.email AS applicant_email,
            owner.email AS owner_email
          FROM applications
          JOIN users AS applicant ON applications.user_id = applicant.id
          JOIN jobs ON applications.job_id = jobs.id
          JOIN companies ON jobs.company_id = companies.id
          JOIN users AS owner ON companies.user_id = owner.id
          WHERE applications.id = $1
        `,
        values: [application_id],
      };

      const result = await pool.query(query);
      const details = result.rows[0];

      if (details) {
        const mailOptions = {
          from: `OpenJob System <${process.env.FROM_EMAIL}>`,
          to: details.owner_email,
          subject: 'New Job Application Notification',
          text: `
            Hi,
            
            You have a new job application!
            
            Applicant Name: ${details.applicant_name}
            Applicant Email: ${details.applicant_email}
            Application Date: ${details.application_date}
            
            Please log in to your dashboard to review the application.
            
            Regards,
            OpenJob Team
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to job owner: ${details.owner_email}`);
      }

      channel.ack(message);
    } catch (error) {
      console.error('Error processing message:', error);
      channel.ack(message);
    }
  });
};

init().catch(console.error);
