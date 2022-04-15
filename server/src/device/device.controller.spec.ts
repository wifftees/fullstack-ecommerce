import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from '../file/file.service';
import { DeviceController } from './controllers/device.controller';
import { DeviceModule } from './device.module';
import { DevicesService } from './services/devices.service';

describe('Device Controller', () => {
    let controller: DeviceController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DeviceModule],
            controllers: [DeviceController],
            providers: [DevicesService, FileService]
        }).compile();

        controller = module.get<DeviceController>(DeviceController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
