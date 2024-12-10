const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 2525,
    secure:false,
    auth: {
        user: 'vmeet',
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'soumyamakkar2004@outlook.com',
            to:to,
            subject:subject,
            text:text,
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Email send error:', error);
    }
};

module.exports = sendEmail;
