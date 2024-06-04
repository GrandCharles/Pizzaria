-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(40) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "senha" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "codigo" SERIAL NOT NULL,
    "nome" VARCHAR(40) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "idCategoria" TEXT NOT NULL,
    "codigo" SERIAL NOT NULL,
    "nome" VARCHAR(40) NOT NULL,
    "descricao" VARCHAR(40) NOT NULL,
    "unidade" VARCHAR(3) NOT NULL,
    "valor" DECIMAL(9,2) NOT NULL,
    "imagem" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" TEXT NOT NULL,
    "codigo" SERIAL NOT NULL,
    "mesa" VARCHAR(10) NOT NULL,
    "nomeCliente" VARCHAR(40),
    "enviado" BOOLEAN NOT NULL DEFAULT false,
    "preparado" BOOLEAN NOT NULL DEFAULT false,
    "finalizado" BOOLEAN NOT NULL DEFAULT false,
    "total" DECIMAL(9,2),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidosItens" (
    "id" TEXT NOT NULL,
    "idPedido" TEXT NOT NULL,
    "idProduto" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "total" DECIMAL(9,2) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidosItens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidosItens" ADD CONSTRAINT "pedidosItens_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidosItens" ADD CONSTRAINT "pedidosItens_idPedido_fkey" FOREIGN KEY ("idPedido") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
