import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import path from 'path';  // Caminhos

import { router } from './routes';

const app = express();
app.use(express.json());

app.use(cors());

// middleware para acessar as imagens criando uma rota static  // http://localhost:3333/pathImagens/b89ce1c3cf73aef5e0d8cdd4457bf265-Pizza%20Portuguesa.jpeg
app.use(
    '/pathImagens',
    express.static(path.resolve(__dirname, '..', 'imagens'))
);

app.use(router);

// Trativa de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        // Se for uma instancia do tipo Erro
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: '*** Internal Server Error! ***'
    });
});

app.listen(3333, () => {
    console.log('Servidor Online na porta 3333! ');
});
