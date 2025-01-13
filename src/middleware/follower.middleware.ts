import { NextFunction, Request, Response } from "express";
import { repository } from "../database/prisma.connection";

export async function validateFollower(req: Request, res: Response, next: NextFunction){
    try {
        const { userId } = req.params
        const { username } = req.body
        
        if(!username){
            return res.status(400).json({
                success: false,
                code: res.statusCode,
                message: 'Forneça um nome de usuario para seguir',
            })
        }

        const follow = await repository.user.findUnique({where: {username}})
        console.log(follow)

        if(!follow){
            return res.status(404).json({
                success: false,
                code: res.statusCode,
                message: 'Usuário não encontrado verifique e tente novamente',
            })
        }

        if(userId === follow.id){
            return res.status(404).json({
                success: false,
                code: res.statusCode,
                message: 'Usuário não pode seguir ou deixar de seguir a si mesmo',
            })
        }

        req.userToFollow = {
            id: follow.id,
            username: follow.username
        }

        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            code: res.statusCode,
            message: `Erro ao validar follower ${error}`
        })
    }
}
