import { Request, Response } from 'express';
import { ManterPedidoService } from '../../services/pedido/ManterPedidoService';

export class ManterPedidoController {

    async handleCriar(req: Request, res: Response) {
        const { mesa, nomeCliente } = req.body;

        const manterPedidoService = new ManterPedidoService();

        const pedido = await manterPedidoService.criar({ mesa, nomeCliente });

        return res.json(pedido);
    }

    async handleAlterar(req: Request, res: Response) {
        const id = req.query.id as string;
        const { mesa, nomeCliente, enviado, preparado, finalizado } = req.body;

        const manterPedidoService = new ManterPedidoService();

        const pedido = await manterPedidoService.alterar({ id, mesa, nomeCliente, enviado, preparado, finalizado });

        return res.json(pedido);
    }

    async handleExcluir(req: Request, res: Response) {
        const id = req.query.id as string;

        const manterPedidoService = new ManterPedidoService();

        const pedido = await manterPedidoService.excluir(id);

        return res.json(pedido);
    }

    // Listando
    async handleListar(req: Request, res: Response) {

        const manterPedidoService = new ManterPedidoService();

        const pedido = await manterPedidoService.listar();

        return res.json(pedido);
    }

    async handleEditarCodigo(req: Request, res: Response) {
        const codigo = req.query.codigo as string;

        const manterPedidoService = new ManterPedidoService();

        const pedido = await manterPedidoService.editarCodigo(parseInt(codigo));

        return res.json(pedido);
    }

    async handleEnviar(req: Request, res: Response) {
        const id = req.query.id as string;
        const { enviado } = req.body;

        const manterPedidoService = new ManterPedidoService();

        const pedido = await manterPedidoService.enviar({ id, enviado });

        return res.json(pedido);
    }
    async handlePreparar(req: Request, res: Response) {
        const id = req.query.id as string;
        const { preparado } = req.body;

        const manterPedidoService = new ManterPedidoService();

        const Pedido = await manterPedidoService.preparar({ id, preparado });

        return res.json(Pedido);
    }
    async handleFinalizar(req: Request, res: Response) {
        const id = req.query.id as string;
        const { finalizado } = req.body;

        const manterPedidoService = new ManterPedidoService();

        const pedido = await manterPedidoService.finalizar({ id, finalizado });

        return res.json(pedido);
    }

    async handleSetTotPed(req: Request, res: Response) {
        const id = req.query.id as string;
        const { total  } = req.body;

        const manterPedidoService = new ManterPedidoService();

        const pedido = await manterPedidoService.totalPedido( id, total );

        return res.json(pedido);
    }


}
