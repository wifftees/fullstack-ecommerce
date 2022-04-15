import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Device } from './device.schema';

export type RatingDocument = Rating & Document;

@Schema()
export class Rating {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ type: Types.ObjectId, ref: 'Device' })
    deviceId: Device;

    @Prop()
    value: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
