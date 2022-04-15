import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalLoginStrategy extends PassportStrategy(Strategy, 'login') {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string) {
        const user = await this.authService.validateLogin(username, password);
        if (!user) {
            throw new UnauthorizedException(
                'Your username or password is incorrect'
            );
        }
        return { userId: user._id, username, password };
    }
}
