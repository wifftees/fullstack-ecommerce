import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { AccessTokenData, TokensData } from './types/Tokens.type';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async hash(stroke: string) {
        return await bcrypt.hash(stroke, 5);
    }

    async compare(plainText: string, hash: string) {
        return await bcrypt.compare(plainText, hash);
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hash(refreshToken);
        await this.userService.updateRefreshToken(userId, hashedRefreshToken);
    }

    updateJwtCookies(response: Response, tokens: TokensData): AccessTokenData {
        const { refreshToken, accessToken } = tokens;
        response.cookie('jwt', refreshToken);
        return { accessToken };
    }

    async refreshTokens(
        userId: string,
        username: string,
        refreshToken: string
    ) {
        const user = await this.userService.findOneByUserId(userId);

        if (!user || !user.refreshToken) {
            throw new ForbiddenException('Access denied');
        }

        const isTokensMatch = await this.compare(
            refreshToken,
            user.refreshToken
        );
        if (!isTokensMatch) {
            throw new ForbiddenException('Access denied');
        }

        await user.populate('roles', 'value');

        const tokens = await this.issueTokens(
            userId,
            username,
            user.roles.map(({ value }) => value)
        );
        await this.updateRefreshToken(userId, tokens.refreshToken);

        return tokens;
    }

    issueTokens(userId: string, username: string, roles: string[]): TokensData {
        const payload = { userId, username, roles };
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: process.env.ACCESS_SECRET,
                expiresIn: '15m'
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: process.env.REFRESH_SECRET,
                expiresIn: '7d'
            })
        };
    }

    async validateRegister(username: string): Promise<boolean> {
        const user = await this.userService.findOneByUsername(username);
        return Boolean(user);
    }

    async validateLogin(username: string, password: string) {
        const user = await this.userService.findOneByUsername(username);
        const isUserValidated =
            user && (await this.compare(password, user.password));
        return isUserValidated ? user : null;
    }

    async registerUser(regiserDto: RegisterDto): Promise<TokensData> {
        const { username, password } = regiserDto;
        const user = await this.userService.create({
            ...regiserDto,
            password: await this.hash(password)
        });
        await user.populate('roles', 'value');
        const tokens = await this.issueTokens(
            user._id,
            username,
            user.roles.map(({ value }) => value)
        );
        await this.updateRefreshToken(user._id, tokens.refreshToken);
        return tokens;
    }

    async loginUser(loginDto: LoginDto): Promise<TokensData> {
        const { userId, username } = loginDto;
        const user = await this.userService.findOneByUserId(userId);
        await user.populate('roles', 'value');
        const tokens = this.issueTokens(
            userId,
            username,
            user.roles.map(({ value }) => value)
        );
        await this.updateRefreshToken(userId, tokens.refreshToken);
        return tokens;
    }
}
