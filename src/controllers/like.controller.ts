import { Request, Response } from "express";
import { repository } from "../database/prisma.connection";

export class LikeController{
    public async like(req: Request, res: Response){
        try {
            const { userId, tweetId } = req.params

            if(!tweetId){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Forneça um id de tweet para curtir',
                })
            }

            const tweet = await repository.tweet.findUnique({where: {id: tweetId}})

            if(!tweet){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Tweet não encontrado verifique e tente novamente',
                })
            }

            const isFollowing = await repository.like.findFirst({
                where: {
                    userId,
                    tweetId
                }
            })

            if(isFollowing){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Usuário não pode curtir um post que ja curtiu',
                })
            }

            const createFollower = await repository.like.create({
                data:{
                    userId,
                    tweetId
                }
            })

            return res.status(201).json({
                success: true,
                code: res.statusCode,
                message: 'Tweet curtido com sucesso',
                data: createFollower
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao curtir Tweet ${error}`
            })
        }
    }

    public async show(req: Request, res: Response){
        try {
            const { tweetId } = req.params

            const likes = await repository.like.findMany({where: {tweetId}})

            if(likes.length === 0){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: 'O tweet não tem curtidas',
                })
            }

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Seguidores listados com sucesso',
                data: {
                    totalLikes: likes.length,
                    usersData: likes
                }
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao curtir tweet ${error}`
            })
        }
    }

    public async dislike(req: Request, res: Response){
        try {
            const { userId, tweetId } = req.params

            if(!tweetId){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Forneça um nome de usuario para seguir',
                })
            }

            const like = await repository.like.findFirst({where: {tweetId}})

            if(!like){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Tweet não encontrado verifique e tente novamente',
                })
            }

            const isLiked = await repository.like.findFirst({
                where: {
                    userId,
                    tweetId
                }
            })

            if(!isLiked){
                return res.status(404).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Usuário não curtiu esse post!',
                })
            }

            const dislike = await repository.like.delete({
                where: {
                    tweetId_userId:{
                        userId,
                        tweetId
                    }
                }
            })

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Usuario deixou de curtir esse post com sucesso',
                data: dislike
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao curtir post ${error}`
            })
        }
    }
}