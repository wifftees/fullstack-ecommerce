import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role, RoleDocument } from './schemas/role.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name) private rolesModel: Model<RoleDocument>
    ) {}

    async createRole(dto: CreateRoleDto) {
        return await this.rolesModel.create(dto);
    }

    async getRoleByValue(value: string) {
        return await this.rolesModel.findOne({ value });
    }
}
