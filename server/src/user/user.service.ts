import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { DevicesService } from 'src/device/services/devices.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private rolesService: RolesService,
        private devicesService: DevicesService
    ) {}

    async create(dto: CreateUserDto) {
        const { _id: roleId } = await this.rolesService.getRoleByValue('USER');
        const user = await this.userModel.create({
            ...dto,
            roles: [roleId],
            basket: []
        });
        return user;
    }

    async findOneByUsername(username: string) {
        return await this.userModel.findOne({ username });
    }

    async findOneByUserId(userId: string) {
        return await this.userModel.findOne({ _id: userId });
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        await this.userModel.updateOne({ _id: userId }, { refreshToken });
    }

    async getAll() {
        return this.userModel.find({});
    }

    async addRole(dto: AddRoleDto) {
        const { userId, value: roleValue } = dto;
        const role = await this.rolesService.getRoleByValue(roleValue);
        const user = await this.userModel.findOne({ _id: userId });
        if (role && user) {
            user.roles.push(role._id);
            user.save();
            return dto;
        } else {
            throw new HttpException(
                'User or role is not found',
                HttpStatus.NOT_FOUND
            );
        }
    }

    async addItemToBasket(userId: string, deviceId: string) {
        const device = await this.devicesService.getOneDevice(deviceId);
        if (!device) {
            throw new HttpException(
                'Device is not found',
                HttpStatus.NOT_FOUND
            );
        }
        const user = await this.userModel.findOne({ _id: userId });
        user.basket.push(device._id);
        user.save();
        user.populate('basket');
        return user.basket;
    }

    async removeItemFromBasket(userId: string, deviceId: string) {
        const device = await this.devicesService.getOneDevice(deviceId);
        if (!device) {
            throw new HttpException(
                'Device is not found',
                HttpStatus.NOT_FOUND
            );
        }

        await this.userModel.updateOne(
            { _id: userId },
            {
                $pull: {
                    basket: device._id
                }
            }
        );
        const user = await this.userModel.findOne({ _id: userId });
        user.populate('basket');
        return user.basket;
    }

    async getBasket(userId: string) {
        const user = await this.userModel
            .findOne({ _id: userId })
            .populate('basket');
        return user.basket;
    }
}
