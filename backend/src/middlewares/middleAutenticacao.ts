import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken'

interface Payload {
    // Id do usuário
    sub: string
}

export function middleAutenticacao(req: Request, res: Response, next: NextFunction) {
    // Token
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(' ');

    try {
        // Validando token
        const { sub } = verify(token, process.env.JWT_SECURITY) as Payload;

        // Criado uma varável "userId" no express.Request
        req.userId = sub;

        return next();
    } catch (err) {
        return res.status(401).end();
    }
}
