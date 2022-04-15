import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceInfo, DeviceInfoDocument } from '../schemas/deviceInfo.schema';

@Injectable()
export class DeviceInfoService {
    constructor(
        @InjectModel(DeviceInfo.name)
        private deviceInfoModel: Model<DeviceInfoDocument>
    ) {}

    async create(title: string, description: string, deviceId: string) {
        return await this.deviceInfoModel.create({
            deviceId,
            title,
            description
        });
    }
}
