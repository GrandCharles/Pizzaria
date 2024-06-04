import prismaClient from '../../prisma';

interface CategoriaTypes {
    nome: string;
}

export class ManterCategoriaService {

    async criar({ nome }: CategoriaTypes) {
        // Obrigatório
        if (nome === '') {
            throw new Error("Nome é Obrigatório");
        }

        const categoria = await prismaClient.categoria.create({
            data: {
                nome: nome
            }
        });

        return categoria;
    }

    async alterar(id: string, nome: string) {
        // Obrigatório
        if (nome === '') {
            throw new Error("Nome é Obrigatório");
        }

        const categoria = await prismaClient.categoria.update({
            data: {
                nome: nome
            },
            where: {
                id: id
            }
        });

        return categoria;
    }

    async excluir(id: string) {

        const categoria = await prismaClient.categoria.delete({
            where: {
                id: id
            },
        });

        return categoria;
    }
    
    async listar() {
        const categoria = await prismaClient.categoria.findMany({
            orderBy: {
                nome: 'asc'
            },
            /*
            select: {
                id: true,
                nome: true
            }
            */
        });

        return categoria;
    }
        
    async editarCodigo(codigo: number) {
        const categoria = await prismaClient.categoria.findMany({
            where: {
                codigo: codigo
            },
        });

        return categoria;
    }

}


