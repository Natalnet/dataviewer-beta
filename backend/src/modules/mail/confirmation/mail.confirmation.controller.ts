import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { MailConfirmationService } from "./mail.confirmation.service";
import { MailConfirmDto } from "./dto/mail-confirm.dto";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RequestWithUser } from "src/types/Requests";

@Controller('email-confirmation')
@UseInterceptors(ClassSerializerInterceptor)
export class MailConfirmationController {

    constructor(private readonly mailConfirmationService: MailConfirmationService) {}

    @Post('confirm')
    async confirm(@Body() mailConfirmationData: MailConfirmDto) {
        const email = await this.mailConfirmationService.decodeConfirmationToken(mailConfirmationData.token);

        await this.mailConfirmationService.confirmEmail(email);
    }
}