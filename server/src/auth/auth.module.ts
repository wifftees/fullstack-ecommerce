import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalLoginStrategy } from './strategies/local-login.strategy';
import { LocalRegisterStrategy } from './strategies/local-register.strategy';

@Module({
    imports: [UserModule, PassportModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalLoginStrategy,
        LocalRegisterStrategy,
        JwtAccessStrategy,
        JwtRefreshStrategy
    ]
})
export class AuthModule {}
