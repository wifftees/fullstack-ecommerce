import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Type, TypeDocument } from '../schemas/type.shema';
import { Model } from 'mongoose';
import { CreateTypeBrandDto } from '../dto/create-type-brand.dto';

@Injectable()
export class TypesService {
    constructor(
        @InjectModel(Type.name) private typeModel: Model<TypeDocument>
    ) {}

    async create(dto: CreateTypeBrandDto) {
        const { name } = dto;
        return await this.typeModel.create({ name });
    }

    async getAll() {
        return await this.typeModel.find();
    }
}
