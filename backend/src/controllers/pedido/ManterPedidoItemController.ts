import { Request, Response } from 'express';
import { ManterPedidoItemService } from '../../services/pedido/ManterPedidoItemService';

export class ManterPedidoItemController {

    async handleCriar(req: Request, res: Response) {
        const { idPedido, idProduto, quantidade, total } = req.body;

        const manterPedidoItemService = new ManterPedidoItemService();

        const pedidoItem = await manterPedidoItemService.criar({ idPedido, idProduto, quantidade, total });

        return res.json(pedidoItem);
    }

    async handleAlterar(req: Request, res: Response) {
        const id = req.query.id as string;
        const { idProduto, quantidade, total } = req.body;

        const manterPedidoItemService = new ManterPedidoItemService();

        const ordemPedidoItem = await manterPedidoItemService.alterar({ id, idProduto, quantidade, total });

        return res.json(ordemPedidoItem);
    }

    async handleExcluir(req: Request, res: Response) {
        const id = req.query.id as string;

        const manterPedidoItemService = new ManterPedidoItemService();

        const pedidoItem = await manterPedidoItemService.excluir(id);

        return res.json(pedidoItem);
    }

    async handleListar(req: Request, res: Response) {
        const idPedido = req.query.idPedido as string;

        const manterPedidoItemService = new ManterPedidoItemService();

        const pedidoItem = await manterPedidoItemService.listar(idPedido);

        return res.json(pedidoItem);
    }


}
