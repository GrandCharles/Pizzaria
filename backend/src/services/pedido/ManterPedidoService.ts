import prismaClient from '../../prisma';

interface CriarPedidoTypes {
    mesa: string;
    nomeCliente: string;
}

interface AlterarPedidoTypes {
    id: string;
    mesa: string;
    nomeCliente: string;
    enviado: boolean;
    preparado: boolean;
    finalizado: boolean;
}

interface EnviarPedidoTypes {
    id: string;
    enviado: boolean;
}
interface PrepararPedidoTypes {
    id: string;
    preparado: boolean;
}
interface FinalizarPedidoTypes {
    id: string;
    finalizado: boolean;
}

export class ManterPedidoService {
    async criar({ mesa, nomeCliente }: CriarPedidoTypes) {
        if (mesa === '') {
            throw new Error('Mesa do Pedido é Obrigatório');
        }

        const pedido = await prismaClient.pedido.create({
            data: {
                mesa: mesa,
                nomeCliente: nomeCliente,
            }
        });
        return pedido;
    }

    async alterar({ id, mesa, nomeCliente, enviado, preparado, finalizado }: AlterarPedidoTypes) {
        if (mesa === '') {
            throw new Error('Mesa do Pedido é Obrigatório');
        }

        const pedido = await prismaClient.pedido.update({
            data: {
                mesa: mesa,
                nomeCliente: nomeCliente,
                enviado: enviado,
                preparado: preparado,
                finalizado: finalizado,
            },
            where: {
                id: id
            }
        });

        return pedido;
    }

    async excluir(id: string) {
        const pedido = await prismaClient.pedido.delete({
            where: {
                id: id
            },
        });
        return pedido;
    }

    // Listando -------------------------------------------------------------------------
    async listar() {
        const pedido = await prismaClient.pedido.findMany({
            include: {
                pedidosItem: {
                    include: {
                        produto: {
                            include: {
                                categoria: true,
                            },
                        },
                    },
                },
            },

            /*
                select: {
                    id: true,
                    nome: true,
                },

                select: {
                    id: true,
                    codigo: true,
                    nome: true,
                    descricao: true,
                    valor: true,
                },

                id: true,
                codigo: true,
                mesa: true,
                nomeCliente: true,
                created_at: true,

                    select: {
                        id: true,
                        idProduto: true,
                        quantidade: true,
                        created_at: true,
                    },

            include: {
                PedidoItem: true,
            },

            orderBy: {
                created_at: 'desc'
            }

            include: {
                PedidoItem: {
                    include: {
                        produto: {
                            include: {
                                categoria: {
                                },
                            },
                        },
                    },
                },
            },
            */

        });
        return pedido;
    }

    async editarCodigo(codigo: number) {
        const pedido = await prismaClient.pedido.findMany({
            where: {
                codigo: codigo
            },
        });

        return pedido;
    }
    // ------------------------------------------------------------------------------------

    async enviar({ id, enviado }: EnviarPedidoTypes) {
        const pedido = await prismaClient.pedido.update({
            data: {
                enviado: enviado
            },
            where: {
                id: id
            },
            select: {
                enviado: true,
            }
        });
        return pedido;
    }

    async preparar({ id, preparado }: PrepararPedidoTypes) {

        const pedido = await prismaClient.pedido.update({
            data: {
                preparado: preparado
            },
            where: {
                id: id
            },
            select: {
                preparado: true,
            }
        });
        return pedido;
    }
    async finalizar({ id, finalizado }: FinalizarPedidoTypes) {

        const pedido = await prismaClient.pedido.update({
            data: {
                finalizado: finalizado
            },
            where: {
                id: id
            },
            select: {
                finalizado: true,
            }

        });
        return pedido;
    }

    async totalPedido( id:  string, total: number ) {
        const pedido = await prismaClient.pedido.update({
            data: {
                total: total,
            },
            where: {
                id: id
            }
        });
        return pedido;
    }

}
