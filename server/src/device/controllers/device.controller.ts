import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAccessGuard } from '../../auth/guards/jwt-auth.guard';
import { GetUserId } from '../../common/decorators/get-user-id.decorator';
import { DevicesService } from '../services/devices.service';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateRatingDto } from '../dto/update-rating.dto';
import { Admin } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetAllDto } from '../dto/get-all.dto';

@Controller('devices')
export class DeviceController {
    constructor(private deviceService: DevicesService) {}

    @Admin()
    @UseGuards(JwtAccessGuard, RolesGuard)
    @Post('/')
    @UseInterceptors(FileInterceptor('img'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: CreateDeviceDto
    ) {
        return await this.deviceService.create(data, file);
    }

    @Get('/')
    async getAll(@Query() query: GetAllDto) {
        return await this.deviceService.getAllDevices(query);
    }

    @Get('/:id')
    async getOne(@Query('id') deviceId: string) {
        return await this.deviceService.getOneDevice(deviceId);
    }

    @UseGuards(JwtAccessGuard)
    @Post('/rating')
    updateRating(@GetUserId() id: string, @Body() data: UpdateRatingDto) {
        return this.deviceService.updateDeviceRating(
            id,
            data.deviceId,
            data.action
        );
    }
}
