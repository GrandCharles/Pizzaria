import { Request, Response } from 'express';
import { ManterProdutoService } from '../../services/produto/ManterProdutoService';

export class ManterProdutoController {

    async handleCriar(req: Request, res: Response) {
        const { nome, descricao, unidade, valor, idCategoria } = req.body;

        const manterProdutoService = new ManterProdutoService();

        if (!req.file) {
            throw new Error('Arquivo de imagem deve ser fornecido!');
        } else {
            // renomear o "filename" para o nome do atributo de Produto para "imagem"
            const { originalname, filename: imagem } = req.file;

            const produto = await manterProdutoService.criar({
                idCategoria,
                nome,
                descricao,
                unidade,
                valor,
                imagem
            });

            return res.json(produto);
        }
    }

    async handleAlterar(req: Request, res: Response) {
        const id = req.query.id as string;
        const { idCategoria, nome, descricao, unidade, valor, img } = req.body;

        const manterProdutoService = new ManterProdutoService();

        let imagem = img;
        if (req.file) {
            const { originalname, filename: img } = req.file;
            imagem = img;
        };

        const produto = await manterProdutoService.alterar({ id, idCategoria, nome, descricao, unidade, valor, imagem });
        return res.json(produto);
    }


    async handleExcluir(req: Request, res: Response) {
        const id = req.query.id as string;

        const manterProdutoService = new ManterProdutoService();

        const produto = await manterProdutoService.excluir(id);

        return res.json(produto);
    }

    async handleListar(req: Request, res: Response) {
        const listarProdutoService = new ManterProdutoService();

        const produto = await listarProdutoService.listar();

        return res.json(produto);
    }

    async handleListarPorCategoria(req: Request, res: Response) {
        const idCategoria = req.query.idCategoria as string;

        const listarPorCategoria = new ManterProdutoService();

        const produto = await listarPorCategoria.listarPorCategoria({ idCategoria });

        return res.json(produto);
    }

    async handleEditarCodigo(req: Request, res: Response) {
        const codigo = req.query.codigo as string;

        const manterProdutoService = new ManterProdutoService();

        const produto = await manterProdutoService.editarCodigo(parseInt(codigo));

        return res.json(produto);
    }

}
