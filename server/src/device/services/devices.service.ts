import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument } from '../schemas/device.schema';
import { Model } from 'mongoose';
import { CreateDeviceDto, DeviceInfo } from '../dto/create-device.dto';
import { FileService, FileType } from '../../file/file.service';
import { GetAllDto } from '../dto/get-all.dto';
import { RatingActions } from '../dto/update-rating.dto';
import { DeviceInfoService } from './deviceInfo.service';
import { RatingService } from './rating.service';

@Injectable()
export class DevicesService {
    constructor(
        @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
        private ratingService: RatingService,
        private fileService: FileService,
        private deviceInfoService: DeviceInfoService
    ) {}

    async updateRatingValue(value: number, userId: string, deviceId: string) {
        const rating = await this.ratingService.getOne(userId, deviceId);
        if (rating) {
            return await this.ratingService.updateValue(
                userId,
                deviceId,
                value
            );
        } else {
            const { _id } = await this.ratingService.create(
                userId,
                deviceId,
                value
            );
            const device = await this.deviceModel.findOne({ deviceId });
            device.rating.push(_id);
            device.save();
        }
    }

    async create(dto: CreateDeviceDto, img: Express.Multer.File) {
        const fileName = this.fileService.create(FileType.IMAGE, img);
        const { info, ...restDeviceProps } = dto;
        const device = await this.deviceModel.create({
            ...restDeviceProps,
            img: fileName
        });
        if (info) {
            const parsedInfo: DeviceInfo[] = JSON.parse(info);
            const deviceInfosIds = await Promise.all(
                parsedInfo.map(async ({ title, description }) => {
                    const { _id } = await this.deviceInfoService.create(
                        title,
                        description,
                        device._id
                    );
                    return _id;
                })
            );
            deviceInfosIds.forEach((id) => device.info.push(id));
            device.save();
        }
    }

    async getAllDevices(dto: GetAllDto) {
        const { brandId, typeId, limit = 9, page = 1 } = dto;
        const offset = page * limit - limit;

        if (!brandId && !typeId) {
            return await this.deviceModel
                .find()
                .sort({ _id: -1 })
                .skip(offset)
                .limit(limit)
                .populate('rating', 'value')
                .populate('info', 'title description');
        }
        if (brandId && typeId) {
            return await this.deviceModel
                .find({ typeId, brandId })
                .sort({ _id: -1 })
                .skip(offset)
                .limit(limit)
                .populate('info', 'title description');
        }
        if (brandId && !typeId) {
            return await this.deviceModel
                .find({ brandId })
                .sort({ _id: -1 })
                .skip(offset)
                .limit(limit)
                .populate('info', 'title description');
        }
        if (!brandId && typeId) {
            return await this.deviceModel
                .find({ typeId })
                .sort({ _id: -1 })
                .skip(offset)
                .limit(limit)
                .populate('info', 'title description');
        }
    }

    async getOneDevice(deviceId: string) {
        const device = await this.deviceModel
            .findOne({ _id: deviceId })
            .populate('rating', 'value');
        return device;
    }

    async updateDeviceRating(
        userId: string,
        deviceId: string,
        action: RatingActions
    ) {
        switch (action) {
            case 'DELETE':
                const { _id } = await this.ratingService.removeOne(
                    userId,
                    deviceId
                );
                this.deviceModel.updateOne(
                    { deviceId },
                    {
                        $pullAll: {
                            rating: _id
                        }
                    }
                );
                break;
            case 'PLUS':
                await this.updateRatingValue(1, userId, deviceId);
                break;
            case 'MINUS':
                await this.updateRatingValue(-1, userId, deviceId);
            default:
                break;
        }
    }
}
