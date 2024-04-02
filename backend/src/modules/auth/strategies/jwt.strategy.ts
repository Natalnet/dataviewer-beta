import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { JwtValidateDto } from '../dto/jwt-validate.dto';
import { RequestUserData } from 'src/types/requests';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtValidateDto): Promise<RequestUserData> {
    return {
      userId: payload.sub,
      userEmail: payload.email,
      userName: payload.name,
    };
  }
}
