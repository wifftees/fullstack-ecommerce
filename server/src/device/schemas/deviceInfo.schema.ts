import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Device } from './device.schema';

export type DeviceInfoDocument = DeviceInfo & Document;

@Schema()
export class DeviceInfo {
    @Prop({ type: Types.ObjectId, ref: 'Device' })
    deviceId: Device;

    @Prop()
    title: string;

    @Prop()
    description: string;
}

export const DeviceInfoSchema = SchemaFactory.createForClass(DeviceInfo);
