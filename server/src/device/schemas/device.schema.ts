import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from './brand.schema';
import { DeviceInfo } from './deviceInfo.schema';
import { Rating } from './rating.schema';
import { Type } from './type.shema';

export type DeviceDocument = Device & Document;

@Schema()
export class Device {
    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'TypeId' }]
    })
    typeId: Type;

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'BrandId' }]
    })
    brandId: Brand;

    @Prop({ type: [{ type: Types.ObjectId, ref: DeviceInfo.name }] })
    info: DeviceInfo[];

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'Rating' }]
    })
    rating: Types.ObjectId[];

    @Prop()
    img: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
