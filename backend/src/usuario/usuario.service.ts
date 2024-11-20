import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './Entity/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioCreateDTO } from './dto/usuarioCreate.dto';
import { Papel } from './Entity/papelEnum';
import { Aluno } from './Entity/aluno.entity';
import { Instrutor } from './Entity/instrutor.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuario : Repository<Usuario>,
        @InjectRepository(Aluno)
        private readonly aluno: Repository<Aluno>,
        @InjectRepository(Instrutor)
        private readonly instrutor: Repository<Instrutor>,
        
    ){}

    async criarUsuario (usuarioDTO: UsuarioCreateDTO): Promise<{ message: String }> {
        const usuario = new Usuario();

        try{
            usuario.nome = usuarioDTO.nome;
            usuario.email = usuarioDTO.email;
            usuario.senha = usuarioDTO.senha;
            usuario.papel = usuarioDTO.papel;
            usuario.foto_perfil = usuarioDTO.foto_perfil;
            
            await this.usuario.save(usuario);
            if (usuario.papel == Papel.ALUNO){
                const aluno = new Aluno();
                aluno.usuario = usuario;
                this.aluno.create();
                await this.aluno.save(aluno);
                return {message: "Aluno cadastrado com sucesso!"};
            } else if (usuario.papel == Papel.INSTRUTOR){
                const instrutor = new Instrutor();
                instrutor.usuario = usuario;
                this.instrutor.create();
                await this.instrutor.save(instrutor);
                return {message: "Professor cadastrado com sucesso!"};
            }else{
                return {message: "Administrador cadastrado com sucesso!"};
            }
        }catch(error){
            console.error(error);
            return {message: "Não foi possível cadastrar o usuário."}
        }
        
    }
}
