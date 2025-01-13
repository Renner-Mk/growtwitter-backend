import { Request, Response } from "express";
import { repository } from "../database/prisma.connection";
import { Follower } from "../models/follower.model";

export class FollowerController{
    public async follow(req: Request, res: Response){
        try {
            const { userId } = req.params
            const { id: userToFollowId } = req.userToFollow!;

            const isFollowing = await repository.follower.findFirst({
                where: {
                    userId,
                    followerId: userToFollowId
                }
            })
    
            if(isFollowing){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Você já está seguindo esse usuário',
                })
            }

            const newFollow = new Follower(userId, userToFollowId)

            const createFollower = await repository.follower.create({
                data:{
                    userId: newFollow.userId,
                    followerId: newFollow.following
                }
            })

            return res.status(201).json({
                success: true,
                code: res.statusCode,
                message: 'Usuario seguido com sucesso',
                data: createFollower
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao seguir Usuario ${error}`
            })
        }
    }

    public async index(req: Request, res: Response){
        try {
            const { userId } = req.params

            const follower = await repository.follower.findMany({where: {userId}})

            if(!follower){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: 'O usuario não tem seguidores',
                })
            }

            return res.status(201).json({
                success: true,
                code: res.statusCode,
                message: 'Seguidores listados com sucesso',
                data: follower
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao seguir Usuario ${error}`
            })
        }
    }

    public async unfollow(req: Request, res: Response){
        try {
            const { userId } = req.params
            const { id: userToFollowId } = req.userToFollow!;

            const isFollowing = await repository.follower.findFirst({
                where: {
                    userId,
                    followerId: userToFollowId
                }
            })

            if(!isFollowing){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Usuário já não está seguindo esse usuario',
                })
            }

            const unfollow = await repository.follower.delete({
                where: {
                    userId_followerId: {
                        userId: userId,
                        followerId: userToFollowId
                    }
                }
            })

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Usuário deixado de seguir com sucesso',
                data: unfollow
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao deixar de seguir Usuário ${error}`
            })
        }
    }
}