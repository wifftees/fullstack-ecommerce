export interface DeviceInfo {
    title: string;
    description: string;
}

export class CreateDeviceDto {
    readonly name: string;
    readonly price: number;
    readonly typeId: string;
    readonly brandId: string;
    readonly info: string | undefined;
}
