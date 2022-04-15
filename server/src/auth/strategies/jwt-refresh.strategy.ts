import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload, JwtRefreshPayload } from '../types/Payload.type';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor() {
        super({
            jwtFromRequest: (request: Request) => {
                let token;
                if (request && request.cookies) {
                    token = request.cookies['jwt'];
                }
                return token;
            },
            ignoreExpiration: false,
            secretOrKey: process.env.REFRESH_SECRET,
            passReqToCallback: true
        });
    }

    validate(request: Request, payload: JwtPayload): JwtRefreshPayload {
        return {
            ...payload,
            refreshToken: request.cookies['jwt']
        };
    }
}
