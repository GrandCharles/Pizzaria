import prismaClient from '../../prisma';

interface CriarPedidoItensTypes {
    idPedido: string;
    idProduto: string;
    quantidade: number;
    total: number;
}

interface AlterarPedidoItensTypes {
    id: string;
    idProduto: string;
    quantidade: number;
    total: number;
}

export class ManterPedidoItemService {
    async criar({ idPedido, idProduto, quantidade, total }: CriarPedidoItensTypes) {
        const msg = validaDadosPedidoItens({ idProduto, quantidade });
        if (msg != '') {
            throw new Error(`${msg}`);
        }

        const pedidoItem = await prismaClient.pedidosItem.create({
            data: {
                idPedido: idPedido,
                idProduto: idProduto,
                quantidade: quantidade,
                total: total
            }
        });
        return pedidoItem;
    }

    async alterar({ id, idProduto, quantidade, total }: AlterarPedidoItensTypes) {
        const msg = validaDadosPedidoItens({ idProduto, quantidade });
        if (msg != '') {
            throw new Error(`${msg}`);
        }

        const pedidoItem = await prismaClient.pedidosItem.update({
            data: {
                idProduto: idProduto,
                quantidade: quantidade,
                total: total
            },
            where: {
                id: id
            }
        });

        return pedidoItem;
    }

    async excluir(id: string) {
        const pedidoItem = await prismaClient.pedidosItem.delete({
            where: {
                id: id
            },
        });
        return pedidoItem;
    }

    async listar(idPedido: string) {
        const pedidoItem = await prismaClient.pedidosItem.findMany({
            where: {
                idPedido: idPedido
            },
            include: {
                produto: true,
            },
            orderBy: {
                created_at: 'desc'
            },
        });
        return pedidoItem;
    }

}


function validaDadosPedidoItens({ idProduto, quantidade }) {
    let msg = '';

    // Obrigatórios
    if (!idProduto) {
        msg = msg + "Produto é Obrigatório \n";
    }
    if (!quantidade) {
        msg = msg + "Quantidade é Obrigatório \n";
    }

    return msg;
};
