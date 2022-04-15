import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Admin } from 'src/common/decorators/roles.decorator';
import { CreateTypeBrandDto } from '../dto/create-type-brand.dto';
import { BrandsService } from '../services/brands.service';

@Controller('brands')
export class BrandsController {
    constructor(private brandService: BrandsService) {}

    @Admin()
    @UseGuards(JwtAccessGuard, RolesGuard)
    @Post('/')
    async create(@Body() dto: CreateTypeBrandDto) {
        return await this.brandService.create(dto);
    }

    @Get('/')
    async getAll() {
        return await this.brandService.getAll();
    }
}
