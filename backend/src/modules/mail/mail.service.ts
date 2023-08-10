import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { createReadStream } from "fs";
import { JwtService } from "@nestjs/jwt";
import Handlebars from "handlebars";
import path from "path";

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService, private jwtService: JwtService) {}

    async sendEmail(email: string, action: string, key: string) {

        const content = createReadStream(path.resolve(__dirname, '.', 'template', `${action}.html`))
        const consumer = Handlebars.compile(content.toString())

        const result = consumer({key, url: process.env.SMTP_REDIRECT})

        await this.mailerService.sendMail({

            to: email,
            from: process.env.SMTP_FROM,
            subject: action === 'confirm_registration' ? 'Confirmação de cadastro' : action === 'forgot_password' ? 'Recuperação de senha':'',
            html: result
        });
    }

    async generateToken(email: string) {
        return this.jwtService.sign(email, {
            expiresIn: '7d'
        })
    }
}