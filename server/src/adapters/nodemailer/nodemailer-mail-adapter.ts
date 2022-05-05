import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c19629f9505629",
      pass: "00838c2371cc3c"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@fedget.com>',
            to: 'Daniel rodrigues <adanielluiz71@gmail.com',
            subject,
            html: body,
        });
    }
}