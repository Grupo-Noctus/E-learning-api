import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Login } from './dto/login.class';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async logar(login: Login): Promise<{access_token: string}>{
        const user = await this.userService.findOneEmail(login.email);
        if(!user){
            throw new UnauthorizedException("Os campos não são compativeis.")
        }
        if(user?.senha !== login.senha){
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id, username: user.email}
        return {access_token: await this.jwtService.signAsync(payload)};
    }
}