import prismaClient from '../../prisma';

interface CriarProdutoTypes {
    idCategoria: string;
    nome: string;
    descricao: string;
    unidade: string;
    valor: number;
    imagem: string;
}

interface AlterarProdutoTypes {
    id: string;
    idCategoria: string;
    nome: string;
    descricao: string;
    unidade: string;
    valor: number;
    imagem: string;
}

interface ListaPorCategoriaTypes {
    idCategoria: string;
}

export class ManterProdutoService {

    async criar({ idCategoria, nome, descricao, unidade, valor, imagem }: CriarProdutoTypes) {
        const msg = validaDadosProduto({ idCategoria, nome, descricao, unidade, valor});
        if (msg != '') {
            throw new Error(`${msg}`);
        }

        const produto = await prismaClient.produto.create({
            data: {
                idCategoria: idCategoria,
                nome: nome,
                descricao: descricao,
                unidade: unidade,
                valor: valor,
                imagem: imagem,
            }
        });

        return produto;
    }

    async alterar({ id, idCategoria, nome, descricao, unidade, valor, imagem }: AlterarProdutoTypes) {

        const msg = validaDadosProduto({ idCategoria, nome, descricao, unidade, valor });

        if (msg != '') {
            throw new Error(`${msg}`);
        }

        const produto = await prismaClient.produto.update({
            data: {
                nome: nome,
                idCategoria: idCategoria,
                descricao: descricao,
                unidade: unidade,
                valor: valor,
                imagem: imagem
            },
            where: {
                id: id
            }
        });

        return produto;
    }

    async excluir(id: string) {

        const produto = await prismaClient.produto.delete({
            where: {
                id: id
            },
        });

        return produto;
    }

    async listar() {
        const produto = await prismaClient.produto.findMany({
            include: {
                categoria: true,
            },
            orderBy: {
                nome: 'asc'
            },
        });

        return produto;
    }

    async listarPorCategoria({ idCategoria }: ListaPorCategoriaTypes) {
        const produto = await prismaClient.produto.findMany({
            where: {
                idCategoria: idCategoria
            },
        });

        return produto;
    }

    async editarCodigo(codigo: number) {
        const produto = await prismaClient.produto.findMany({
            where: {
                codigo: codigo
            },
        });

        return produto;
    }
}


function validaDadosProduto({ idCategoria, nome, descricao, unidade, valor}) {
    let msg = '';

    // Obrigatórios
    if (idCategoria === '') {
        msg = msg + "Categoria do produto é Obrigatório \n";
    }
    if (nome === '') {
        msg = msg + "Nome do produto é Obrigatório \n";
    }
    if (descricao === '') {
        msg = msg + "Descrição do produto é Obrigatório \n";
    }
    if (unidade === '') {
        msg = msg + "Unidade do produto é Obrigatório \n";
    }
    if (valor <= 0) {
        msg = msg + "Valor do produto é Obrigatório \n";
    }

    return msg;
};
