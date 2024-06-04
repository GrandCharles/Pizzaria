import prismaClient from '../../prisma';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface UsuarioTypes {
    nome: string;
    email: string;
    senha: string;
};

interface AuthUsuarioType {
    email: string;
    senha: string;
};


export class ManterUsuarioService {

    // Cria um novo usuario com a senha criptografada
    async criar({ nome, email, senha }: UsuarioTypes) {
        // Obrigatórios
        if (!nome) {
            throw new Error("Nome é Obrigatório");
        }
        if (!email) {
            throw new Error("Email é Obrigatório");
        }
        if (!senha) {
            throw new Error("Senha é Obrigatória");
        };

        const emailExiste = await prismaClient.usuario.findFirst({
            where: { email: email }
        });

        if (emailExiste) {
            throw new Error("Email já existente!");
        }

        // gera criptografia da senha
        const senhaHash = await hash(senha, 8);

        const usuario = await prismaClient.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaHash,
            },
            select: {
                id: true,
                nome: true,
                email: true,
                senha: true,
                created_at: true,
                updated_at: true,
            }
        });

        return usuario;
    }
    
    // Ao logar é gerado um token para autenticação
    async logar({ email, senha }: AuthUsuarioType) {

        const usuarioBD = await prismaClient.usuario.findFirst({
            where: {
                email: email
            }
        });
        if (!usuarioBD) {
            throw new Error('Email não encontrado');
        }

        const senhaUsuario = await compare(senha, usuarioBD.senha);
        if (!senhaUsuario) {
            throw new Error('Senha inválida!');
        }

        // Gerar um token JWT e devolver os dados do usuario logado
        const token = sign(
            {
                nome: usuarioBD.nome,
                email: usuarioBD.email
            },
            process.env.JWT_SECURITY,
            {
                subject: usuarioBD.id,
                expiresIn: '350d'
            }
        );

        return {
            id: usuarioBD.id,
            nome: usuarioBD.nome,
            email: usuarioBD.email,
            token: token
        };
    }



    async autenticar(userId: string) {
        const usuario = await prismaClient.usuario.findFirst({
            where: {
                id: userId
            }
        });

        return usuario;
    }

    async listar() {
        const usuarios = await prismaClient.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                senha: true,
                ativo: true,
                created_at: true,
                updated_at: true
            }

        });

        return usuarios;
    }



}
