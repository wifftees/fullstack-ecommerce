import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/device.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { RolesModule } from './roles/roles.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        MongooseModule.forRoot(
            `mongodb+srv://wifftees:2WDMXTlSwWUQVTqy@cluster0.awgjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        ),
        AuthModule,
        UserModule,
        DeviceModule,
        FileModule,
        RolesModule
    ]
})
export class AppModule {}
