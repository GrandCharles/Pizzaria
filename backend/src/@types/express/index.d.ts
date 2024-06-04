// Subscrevendo a tipagem do Request do express
declare namespace Express{
    export interface Request {
        userId: string
    }
}
