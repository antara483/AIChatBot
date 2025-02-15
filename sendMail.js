require("dotenv").config();
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {

        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
    }
});

// Email options
const mailOptions = {
    from: 'sender@gmail.com',    // Sender address
    to: 'reciever@gmail.com', // List of recipients
    subject: 'Test Email from Nodemailer', // Subject line
    text: 'Hello, this is a test email sent using Nodemailer!' // Plain text body
    // html: '<h1>Hello, this is a test email sent using Nodemailer!</h1>' // HTML body (optional)
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred:', error.message);
    } else {
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
    }
});