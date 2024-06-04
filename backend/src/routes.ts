import { Router, Request, Response } from 'express';
import multer from 'multer';

import { ManterUsuarioController } from './controllers/usuario/ManterUsuarioController';
import { middleAutenticacao } from './middlewares/middleAutenticacao';

import { ManterCategoriaController } from './controllers/categoria/ManterCategoriaController';
import { ManterProdutoController } from './controllers/produto/ManterProdutoController';
import { ManterPedidoController } from './controllers/pedido/ManterPedidoController';
import { ManterPedidoItemController } from './controllers/pedido/ManterPedidoItemController';

import uploadConfig from './config/multer';

const router = Router();

// Middleware de imagens
const middleUploadImagem = multer(uploadConfig.upload('./imagens'));


// Usuario
router.post('/criarUser', new ManterUsuarioController().handleCriar);
router.post('/logarUser', new ManterUsuarioController().handleLogar);
// Middleware de autenticação
router.get('/authUser', middleAutenticacao, new ManterUsuarioController().handleAuth);
router.get('/listarUser', middleAutenticacao, new ManterUsuarioController().handleListar);

// Categoria
router.post('/criarCategoria', middleAutenticacao, new ManterCategoriaController().handleCriar);
router.put('/alterarCategoria', middleAutenticacao, new ManterCategoriaController().handleAlterar);
router.delete('/excluirCategoria', middleAutenticacao, new ManterCategoriaController().handleExcluir);
router.get('/listarCategoria', middleAutenticacao, new ManterCategoriaController().handleListar);
router.get('/editarCategoria', middleAutenticacao, new ManterCategoriaController().handleEditarCodigo);

// Produtos
router.post('/criarProduto', middleAutenticacao, middleUploadImagem.single('file'), new ManterProdutoController().handleCriar);
router.put('/alterarProduto', middleAutenticacao, middleUploadImagem.single('file'), new ManterProdutoController().handleAlterar);
router.delete('/excluirProduto', middleAutenticacao, new ManterProdutoController().handleExcluir);
router.get('/listarProduto', middleAutenticacao, new ManterProdutoController().handleListar);
router.get('/listarPorCategoria', middleAutenticacao, new ManterProdutoController().handleListarPorCategoria);
router.get('/editarProduto', middleAutenticacao, new ManterProdutoController().handleEditarCodigo);

// Pedido
router.post('/criarPedido', middleAutenticacao, new ManterPedidoController().handleCriar);
router.put('/alterarPedido', middleAutenticacao, new ManterPedidoController().handleAlterar);
router.delete('/excluirPedido', middleAutenticacao, new ManterPedidoController().handleExcluir);
router.get('/listarPedido', middleAutenticacao, new ManterPedidoController().handleListar);
router.get('/editarPedido', middleAutenticacao, new ManterPedidoController().handleEditarCodigo);

router.put('/enviarPedido', middleAutenticacao, new ManterPedidoController().handleEnviar);
router.put('/prepararPedido', middleAutenticacao, new ManterPedidoController().handlePreparar);
router.put('/finalizarPedido', middleAutenticacao, new ManterPedidoController().handleFinalizar);

router.put('/setTotPed', middleAutenticacao, new ManterPedidoController().handleSetTotPed);

// Pedido Itens
router.post('/criarPedidoItem', middleAutenticacao, new ManterPedidoItemController().handleCriar);
router.put('/alterarPedidoItem', middleAutenticacao, new ManterPedidoItemController().handleAlterar);
router.delete('/excluirPedidoItem', middleAutenticacao, new ManterPedidoItemController().handleExcluir);
router.get('/listarPedidoItem', middleAutenticacao, new ManterPedidoItemController().handleListar);


export { router };

