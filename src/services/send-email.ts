import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.NEXT_PUBLIC_EMAIL_PASS as string);

const SendEmail = async () => {
    const msg = {
        to: "kotykhin_d@ukr.net",
        from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS as string,
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
    }
};

export default SendEmail;
