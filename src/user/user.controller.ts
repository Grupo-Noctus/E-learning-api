import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesGuard } from 'src/auth/authUsers/role.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<{ message } | NotFoundException> {
    await this.userService.create(createUserDto);
    return { message: "Usuário cadastrado!" };
  }

  @Get()
  async getAllUser(): Promise<User[] | NotFoundException> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOneUser(@Param('id') id: number): Promise <User | NotFoundException> {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return { message: "Usuário alterado!", user };
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    const user = await this.userService.remove(id);
    if (!user) {
      throw new NotFoundException(`O usuário de id: {id}, não exite`);
    }
    return { message: "Usuário deletado!", user };
  }
}