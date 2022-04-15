export type JwtPayload = {
    userId: string;
    username: string;
    roles: string[];
};

export type JwtRefreshPayload = JwtPayload & {
    refreshToken: string;
};
