import { NextFunction, Request, Response } from "express";
import { repository } from "../database/prisma.connection";

export async function validateLike(req: Request, res: Response, next: NextFunction){
    try {
        const { tweetId } = req.params

        const tweet = await repository.tweet.findUnique({where: {id: tweetId}})

            if(!tweet){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Tweet não encontrado verifique e tente novamente',
                })
            }

        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            code: res.statusCode,
            message: `Erro ao validar like ${error}`
        })
    }
}
