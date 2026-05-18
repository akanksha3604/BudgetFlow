const nodemailer = require('nodemailer');

const createTransporter = async () => {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    return transporter;
};

const sendOTP = async (email, otp) => {
    try {
        const transporter = await createTransporter();

        const info = await transporter.sendMail({
            from: '"BudgetFlow Security" <security@budgetflow.com>', // sender address
            to: email, // list of receivers
            subject: 'Your BudgetFlow Verification Code', // Subject line
            text: `Your verification code is: ${otp}. It will expire in 10 minutes.`, // plain text body
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #2563eb;">BudgetFlow Verification</h2>
                    <p>Thank you for registering with BudgetFlow. Please use the following code to verify your email address:</p>
                    <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 5px; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p>This code will expire in 10 minutes.</p>
                   </div>`, // html body
        });

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return false;
    }
};

module.exports = {
    sendOTP
};
