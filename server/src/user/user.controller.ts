import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetUserId } from 'src/common/decorators/get-user-id.decorator';
import { Admin } from 'src/common/decorators/roles.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Admin()
    @UseGuards(JwtAccessGuard, RolesGuard)
    @Get()
    async getAll() {
        return await this.userService.getAll();
    }

    @Admin()
    @UseGuards(JwtAccessGuard, RolesGuard)
    @Post('/role')
    async addRole(@Body() dto: AddRoleDto) {
        return await this.userService.addRole(dto);
    }

    @UseGuards(JwtAccessGuard)
    @Post('/basket-add')
    async addItem(
        @GetUserId() userId: string,
        @Body('deviceId') deviceId: string
    ) {
        return await this.userService.addItemToBasket(userId, deviceId);
    }

    @UseGuards(JwtAccessGuard)
    @Post('/basket-remove')
    async removeItem(
        @GetUserId() userId: string,
        @Body('deviceId') deviceId: string
    ) {
        return await this.userService.removeItemFromBasket(userId, deviceId);
    }

    @UseGuards(JwtAccessGuard)
    @Get('/basket')
    async getBasket(@GetUserId() userId: string) {
        return await this.userService.getBasket(userId);
    }
}
