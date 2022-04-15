export type AccessTokenData = {
    accessToken: string;
};

export type RefreshTokenData = {
    refreshToken: string;
};

export type TokensData = AccessTokenData & RefreshTokenData;
