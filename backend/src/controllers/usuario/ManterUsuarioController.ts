import { Request, Response } from 'express';
import { ManterUsuarioService } from '../../services/usuario/ManterUsuarioService';

export class ManterUsuarioController {

    // Cria um novo usuario com a senha criptografada
    async handleCriar(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

        const manterUsuarioService = new ManterUsuarioService;

        const usuario = await manterUsuarioService.criar({
            nome,
            email,
            senha,
        });

        return res.json({ nome, email, senha });
    };
    
    // Ao logar é gerado um token para autenticação
    async handleLogar(req: Request, res: Response) {
        const { email, senha } = req.body;

        const manterUsuarioService = new ManterUsuarioService();

        const auth = await manterUsuarioService.logar({ email, senha });

        return res.json(auth);
    }


    async handleAuth(req: Request, res: Response) {
        const userId = req.userId;

        const manterUsuarioService = new ManterUsuarioService();

        const usuario = await manterUsuarioService.autenticar(userId);

        return res.json(usuario);
    };


    async handleListar(req: Request, res: Response) {
        const manterUsuarioService = new ManterUsuarioService();

        const usuarios = await manterUsuarioService.listar();

        return res.json(usuarios);
    }



};
