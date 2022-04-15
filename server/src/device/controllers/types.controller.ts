import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Admin } from 'src/common/decorators/roles.decorator';
import { CreateTypeBrandDto } from '../dto/create-type-brand.dto';
import { TypesService } from '../services/types.service';

@Controller('types')
export class TypesController {
    constructor(private typeService: TypesService) {}

    @Admin()
    @UseGuards(JwtAccessGuard, RolesGuard)
    @Post('/')
    async create(@Body() dto: CreateTypeBrandDto) {
        return await this.typeService.create(dto);
    }

    @Get('/')
    async getAll() {
        return await this.typeService.getAll();
    }
}
