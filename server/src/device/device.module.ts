import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from '../file/file.service';
import { DeviceController } from './controllers/device.controller';
import { DevicesService } from './services/devices.service';
import { Device, DeviceSchema } from './schemas/device.schema';
import { Rating, RatingSchema } from './schemas/rating.schema';
import { Type, TypeSchema } from './schemas/type.shema';
import { Brand, BrandSchema } from './schemas/brand.schema';
import { TypesService } from './services/types.service';
import { TypesController } from './controllers/types.controller';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { DeviceInfo, DeviceInfoSchema } from './schemas/deviceInfo.schema';
import { DeviceInfoService } from './services/deviceInfo.service';
import { RatingService } from './services/rating.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Device.name, schema: DeviceSchema }
        ]),
        MongooseModule.forFeature([
            { name: Rating.name, schema: RatingSchema }
        ]),
        MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema }]),
        MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
        MongooseModule.forFeature([
            { name: DeviceInfo.name, schema: DeviceInfoSchema }
        ])
    ],
    controllers: [DeviceController, TypesController, BrandsController],
    providers: [
        DevicesService,
        FileService,
        TypesService,
        BrandsService,
        RatingService,
        DeviceInfoService
    ],
    exports: [DevicesService]
})
export class DeviceModule {}
