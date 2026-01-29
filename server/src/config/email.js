import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    connectionTimeout: 10000,
    socketTimeout: 10000,
  });
};

export const transporter = createTransporter();

export const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email server connection verified successfully');
    return true;
  } catch (error) {
    console.error('❌ Email server connection failed:', error.message);
    return false;
  }
};

export const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      ...mailOptions,
    });
    
    console.log('✅ Email sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export const RECIPIENT_EMAILS = {
  INFO: process.env.EMAIL_INFO || 'info@zora-edu.ae',
  SALES: process.env.EMAIL_SALES || 'sales@zora-edu.ae',
  SUPPORT: process.env.EMAIL_SUPPORT || 'support@zora-edu.ae',
  ADMIN: process.env.EMAIL_ADMIN || 'admin@zora-edu.ae',
};