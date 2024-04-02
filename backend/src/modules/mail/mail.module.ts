import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,

        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },

        ignoreTLS: true,
      },

      defaults: {
        from: '"',
      },
    }),
  ],

  providers: [MailerModule],
  exports: [MailerModule],
})
export class MailModule {}
