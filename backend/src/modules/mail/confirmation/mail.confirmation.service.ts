import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/modules/users/schemas/user.schema";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class MailConfirmationService {

    constructor(
        private readonly jwtService: JwtService, 
        private readonly configService: ConfigService,
        private readonly usersService: UsersService) {}

    async confirmEmail(email: string) {
        const user = await this.usersService.findOneByEmail(email)

        if (user.emailConfirmed) {
            throw new BadRequestException('E-mail já confirmado!')
        }

        await this.usersService.update(user.id, {
            emailConfirmed: true
        })
    }

    async resendConfirmation(id: string) {
        const user = await this.usersService.findOne(id);

        if (user.emailConfirmed) {
            throw new BadRequestException('E-mail já confirmado!')
        }
    }

    async decodeConfirmationToken(token: string) {

        try {

            const payload = await this.jwtService.verify(token, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN'),
            });

            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }

            throw new BadRequestException();

        } catch (error) {

            if (error?.name === 'TokenExpiredError') {
                throw new BadRequestException('Token de confirmação expirado');
            }

            throw new BadRequestException('Token de confirmação inválido');
        }
    }
}