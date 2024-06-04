import { Request, Response } from 'express';
import { ManterCategoriaService } from '../../services/categoria/ManterCategoriaService';


export class ManterCategoriaController {

    async handleCriar(req: Request, res: Response) {
        const { nome } = req.body;

        const manterCategoriaService = new ManterCategoriaService();

        const categoria = await manterCategoriaService.criar({ nome });

        return res.json(categoria);
    }

    async handleAlterar(req: Request, res: Response) {
        const id = req.query.id as string;
        const { nome } = req.body;

        const manterCategoriaService = new ManterCategoriaService();

        const categoria = await manterCategoriaService.alterar(id, nome);

        return res.json(categoria);
    }
    
    async handleExcluir(req: Request, res: Response) {
        const id = req.query.id as string;

        try {
            const manterCategoriaService = new ManterCategoriaService();

            const categoria = await manterCategoriaService.excluir(id);

            return res.json(categoria);
        } catch (err) {
            return res.status(400).destroy();
        }

    }

    async handleListar(req: Request, res: Response) {
        const manterCategoriaService = new ManterCategoriaService();

        const categoria = await manterCategoriaService.listar();

        return res.json(categoria);
    }

    async handleEditarCodigo(req: Request, res: Response) {
        const codigo = req.query.codigo as string;

        const manterCategoriaService = new ManterCategoriaService();

        const categoria = await manterCategoriaService.editarCodigo(parseInt(codigo));

        return res.json(categoria);
    }

}
