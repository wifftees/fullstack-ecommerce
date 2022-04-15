import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating, RatingDocument } from '../schemas/rating.schema';

@Injectable()
export class RatingService {
    constructor(
        @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>
    ) {}

    async create(userId: string, deviceId: string, value: number) {
        return await this.ratingModel.create({
            userId,
            deviceId,
            value
        });
    }

    async getOne(userId: string, deviceId: string) {
        return await this.ratingModel.findOne({ userId, deviceId });
    }

    async updateValue(userId: string, deviceId: string, newValue: number) {
        return await this.ratingModel.updateOne(
            { userId, deviceId },
            { value: newValue }
        );
    }

    async removeOne(userId: string, deviceId: string) {
        return await this.ratingModel.findOneAndRemove({
            userId,
            deviceId
        });
    }
}
