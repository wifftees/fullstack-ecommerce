import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtRefreshPayload } from 'src/auth/types/Payload.type';

export const GetRefreshToken = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const payload = request.user as JwtRefreshPayload;
        return payload.refreshToken;
    }
);
