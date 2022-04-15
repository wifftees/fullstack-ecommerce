import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Device } from 'src/device/schemas/device.schema';
import { Role } from 'src/roles/schemas/role.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    refreshToken: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Role' }] })
    roles: Role[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Device' }] })
    basket: Device[];
}

export const UserSchema = SchemaFactory.createForClass(User);
