import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTypeBrandDto } from '../dto/create-type-brand.dto';
import { Brand, BrandDocument } from '../schemas/brand.schema';

@Injectable()
export class BrandsService {
    constructor(
        @InjectModel(Brand.name) private brandModel: Model<BrandDocument>
    ) {}

    async create(dto: CreateTypeBrandDto) {
        const { name } = dto;
        return await this.brandModel.create({ name });
    }

    async getAll() {
        return await this.brandModel.find();
    }
}
