import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './Entity/usuario.entity';
import { DataSource, Repository } from 'typeorm';
import { UsuarioDTO } from './dto/usuarioCreate.dto';
import { Papel } from './Entity/papelEnum';
import { Aluno } from './Entity/aluno.entity';
import { Instrutor } from './Entity/instrutor.entity';
import { UsuarioUpadateDTO } from './dto/usuarioUpdate.dto';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuario: Repository<Usuario>,
        @InjectRepository(Aluno)
        private readonly aluno: Repository<Aluno>,
        @InjectRepository(Instrutor)
        private readonly instrutor: Repository<Instrutor>,
        private readonly dataSource: DataSource,

    ) { }

    //refatoração ok
    async criarUsuario(usuarioDTO: UsuarioDTO): Promise<{ message: string }> {
        const usuario = new Usuario();

        try {
            usuario.nome = usuarioDTO.nome;
            usuario.email = usuarioDTO.email;
            usuario.senha = usuarioDTO.senha;
            usuario.papel = usuarioDTO.papel;
            usuario.foto_perfil = usuarioDTO.foto_perfil;

            await this.usuario.save(usuario);

            if (usuario.papel === Papel.ALUNO) {
                const aluno = new Aluno();
                aluno.usuario = usuario;
                await this.aluno.save(aluno);
                return { message: "Aluno cadastrado com sucesso!" };
            } else if (usuario.papel === Papel.INSTRUTOR) {
                const instrutor = new Instrutor();
                instrutor.usuario = usuario;
                await this.instrutor.save(instrutor);
                return { message: "Professor cadastrado com sucesso!" };
            } else {
                return { message: "Administrador cadastrado com sucesso!" };
            }
        } catch (error) {
            console.error(error);
            throw new Error("Não foi possível cadastrar o usuário.");
        }
    }

    async editarusuario(id: number, usuarioUpdate: UsuarioUpadateDTO): Promise<{ message: String }> {
        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const usuarioEditar = await queryRunner.manager.findOne(Usuario, {
                where: {
                    id_usuario: id
                },
            });

            if (!usuarioEditar) {
                throw new BadRequestException(`Usuario com id ${id} não encontrado.`)
            }

            Object.assign(usuarioEditar, usuarioUpdate);

            await queryRunner.manager.save(Usuario, usuarioEditar);

            await queryRunner.commitTransaction();
            return { message: "Usuario editado com sucesso!" };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.log("Erro ao editar o usuario: ", error);
            throw new BadRequestException("Não foi possível editar o usuário!")
        } finally {
            await queryRunner.release();
        }
    }

    async deletarUsuario(id: number): Promise<{ message: String }> {
        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const usuarioDeletar = await queryRunner.manager.findOne(Usuario, {
                where: {
                    id_usuario: id
                },
                relations: ['instrutor', 'aluno'],
            });
            await queryRunner.manager.delete(Usuario, { id_usuario: id });

            if (!usuarioDeletar) {
                throw new BadRequestException(`Usuario com id ${id} não encontrado.`)
            }

            if (usuarioDeletar.aluno) {
                await queryRunner.manager.delete(Aluno, { matricula: usuarioDeletar.aluno.matricula });
            }

            if (usuarioDeletar.instrutor) {
                await queryRunner.manager.delete(Instrutor, { id_instrutor: usuarioDeletar.instrutor.id_instrutor });
            }

            await queryRunner.commitTransaction();
            return { message: "Usuario deletado com sucesso!" };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.log("Erro ao deletar o usuario: ", error);
            throw new BadRequestException("Não foi possível deletar o usuário!")
        } finally {
            await queryRunner.release();
        }
    }

}
