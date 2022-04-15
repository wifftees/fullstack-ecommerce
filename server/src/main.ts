import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as cookieParser from 'cookie-parser';

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);

        app.use(cookieParser());
        app.setGlobalPrefix('api');

        await app.listen(PORT, () =>
            console.log(`Server started on PORT: ${PORT}`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
