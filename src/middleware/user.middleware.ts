import { NextFunction, Request, Response } from "express";
import { repository } from "../database/prisma.connection";

export async function validateUser(req: Request, res: Response, next: NextFunction){
    try {
        const {name, email, password, username} = req.body

        if(!name || !email || !password || !username){
            return res.status(400).json({
                success: false,
                code: res.statusCode,
                message: 'Preencha todos os campos obrigatórios'
            })
        }

        const userEmail = await repository.user.findUnique({
            where: {email}
        })

        if(userEmail){
            return res.status(400).json({
                success: false,
                code: res.statusCode,
                message: 'Email ja cadastrado'
            })
        }

        const nameUser = await repository.user.findUnique({
            where: {username}
        })

        if(nameUser){
            return res.status(400).json({
                success: false,
                code: res.statusCode,
                message: 'Username já cadastrado tente outro'
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