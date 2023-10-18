const email = require("nodemailer")

class EmailService {

    constructor() {
        this.transporter = email.createTransport({
            auth: {user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD},
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false
        })
    }

    async authEmail(email, activation) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `Account activation on ${process.env.API_URL}`,
            text: "",
            html:
                `
                <div>
                    <h1>Click on link to activate your account</h1>
                    <a href="${activation}">${activation}</a>
                </div>
                `
        })
    }
}

module.exports = new EmailService()