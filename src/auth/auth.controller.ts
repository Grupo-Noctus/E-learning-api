import { Body, Controller, Get, Post,  UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dto/login.class';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('login')
    async verifLogin(@Body() login: Login): Promise<{access_token: string}>{
        return await this.authService.logar(login);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}