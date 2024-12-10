const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 2525,
    secure:false,
    auth: {
        user: 'soumya2401.be22@chitkara.edu.in',
        pass: 'oK75CEH7gPdvkP5B',
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'makkartyres@outlook.com',
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
