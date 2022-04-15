import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { GetRefreshToken } from 'src/common/decorators/get-refresh-token.decorator';
import { GetUserId } from 'src/common/decorators/get-user-id.decorator';
import { GetUsername } from 'src/common/decorators/get-username.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('register'))
    @Post('/register')
    async register(
        @Request() req,
        @Res({ passthrough: true }) response: Response
    ) {
        const tokens = await this.authService.registerUser(
            req.user as RegisterDto
        );
        return this.authService.updateJwtCookies(response, tokens);
    }

    @UseGuards(AuthGuard('login'))
    @Post('/login')
    async login(
        @Request() req,
        @Res({ passthrough: true }) response: Response
    ) {
        const tokens = await this.authService.loginUser(req.user as LoginDto);
        return this.authService.updateJwtCookies(response, tokens);
    }

    @UseGuards(AuthGuard('refresh'))
    @Get('/refresh')
    async refresh(
        @GetUserId() userId: string,
        @GetUsername() username: string,
        @GetRefreshToken() refreshToken: string,
        @Res({ passthrough: true }) response: Response
    ) {
        const tokens = await this.authService.refreshTokens(
            userId,
            username,
            refreshToken
        );
        return this.authService.updateJwtCookies(response, tokens);
    }
}
