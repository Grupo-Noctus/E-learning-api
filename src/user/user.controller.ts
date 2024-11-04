import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('creat')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    if(! user){
      throw new NotFoundException("Existe algum campo inválido!");
    }
    return {message: "Usuário cadastrado!", user};
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    if(!users){
      throw new NotFoundException("Nenhum usuário cadastrado!");
    }
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if(!user){
      throw new NotFoundException(`O usuário de id: {id}, não exite`);
    }
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    if(!user){
      throw new NotFoundException(`O usuário de id: {id}, não exite`);
    }
    return {message: "Usuário alterado!", user};
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const user = await this.userService.remove(id);
    if(!user){
      throw new NotFoundException(`O usuário de id: {id}, não exite`);
    }
    return {message: "Usuário deletado!", user};
  }
}