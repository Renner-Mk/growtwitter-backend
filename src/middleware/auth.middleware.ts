import { NextFunction, Request, Response } from "express";
import { repository } from "../database/prisma.connection";

export async function validateToken(req: Request, res: Response, next: NextFunction){
    try {
        const { authorization } = req.headers
        const { userId } = req.params

        if(!authorization){
            return res.status(401).json({
                success: false,
                code: res.statusCode,
                message: `Token não informado`
            })
        }

        if (!userId) {
            return res.status(400).json({
                success: false,
                code: res.statusCode,
                message: "ID do usuário não fornecido",
            });
        }

        const user = await repository.user.findUnique({
            where: { id: userId }
        })
        

        if(!user || (user.token !== authorization)){
            return res.status(401).json({
                success: false,
                code: res.statusCode,
                message: `Estudante não encontrado`
            })
        }

        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            code: res.statusCode,
            message: `Erro ao validar aluno aa ${error}`
        })
    }
}