import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ConflictException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class LocalRegisterStrategy extends PassportStrategy(
    Strategy,
    'register'
) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<RegisterDto> {
        const user = await this.authService.validateRegister(username);
        if (user) {
            throw new ConflictException(
                `This username ${username} is already exists`
            );
        }
        return {
            username,
            password
        };
    }
}
