import { Request, Response } from "express";
import { repository } from "../database/prisma.connection";
import { Tweet, TweetType } from "../models/tweet.model";

export class TweetController{
    public async index(req: Request, res: Response){
        try{
            const tweet = await repository.tweet.findMany({
                select: {
                    id: true,
                    content: true,
                    type: true,
                    userId: true,
                    tweetOriginalId: true,
                }
            })

            if(tweet.length === 0){
                return res.status(200).json({
                    success: true,
                    code: res.statusCode,
                    message: 'Não há tweets postados!!',
                })
            }

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Tweets listados com sucesso!!',
                data: tweet
            })
        }catch(error){
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao listar tweets ${error}`
            })
        }
    }
    
    public async show(req: Request, res: Response){
            try{
                const { id } = req.params
    
                console.log('a')
                const tweet = await repository.tweet.findFirst({
                    where: {id},
                    select:{
                        id: true,
                        content: true,
                        type: true,
                        userId: true,
                        tweetOriginalId: true,
                    }
                })
                if(!tweet){
                    return res.status(404).json({message: 'Tweet não encontrado'})
                }
        
                return res.status(200).json({
                    success: true,
                    code: res.statusCode,
                    message: 'Usuario listado com sucesso',
                    data: tweet
                })
            }catch(error){
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: `Erro ao listar tweets ${error}`
                })
            }
    }
    
    public async create(req: Request, res: Response){
            try{
                const { id, userId} = req.params
                const {content, type} = req.body
    
                if(!content || !type || !userId || !id){
                    return res.status(400).json({
                        success: false,
                        code: res.statusCode,
                        message: 'Preencha todos os campos obrigatórios'
                    })
                }

                if(!Object.values(TweetType).includes(type)){
                    return res.status(400).json({
                        success: false,
                        code: res.statusCode,
                        message: `O campo 'type' deve ser 'Tweet' ou 'ReTweet'.`,
                    });        
                }
                
                let tweetOriginalId: string | undefined = undefined;

                
                if(type === TweetType.ReTweet){
                    const orginalTweet = await repository.tweet.findFirst({where: {id}})
                    
                    if(!orginalTweet){
                        return res.status(404).json({
                            success: false,
                            code: res.statusCode,
                            message: "Tweet original não encontrado."
                        })
                    }
                    
                    tweetOriginalId = orginalTweet.id
                    
                }
                const newTweet = new Tweet(content, type as TweetType, userId, tweetOriginalId)
    
                const createdTweet = await repository.tweet.create({
                    data:{
                        id: newTweet.id,
                        content: newTweet.content,
                        type: newTweet.type,
                        userId: newTweet.userId,
                        tweetOriginalId: newTweet.tweetOriginalId
                    },
                    select: {
                        id: true,
                        content: true,
                        type: true,
                        userId: true,
                        tweetOriginalId: true
                    }
                })
    
                return res.status(201).json({
                    success: true,
                    code: res.statusCode,
                    message: 'Tweet criado com sucesso!',
                    data: createdTweet
                })
            }catch(error){
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: `Erro ao criar Tweet ${error}`
                })
            }
    }
    
    public async update(req: Request, res: Response){
            try{
                const { id, userId } = req.params
                const {content} = req.body
    
                if(!content){
                    return res.status(400).json({
                        success: false,
                        code: res.statusCode,
                        message: 'Preencha todos os campos obrigatórios'
                    })
                }
    
                const updateUser = await repository.tweet.update({
                    where: {id, userId},
                    data: {
                        content
                    },
                    select: {
                        id: true,
                        content: true,
                        type: true,
                        userId: true,
                        tweetOriginalId: true
                    }
                })

                if(!updateUser){
                    return res.status(404).json({
                        success: false,
                        code: res.statusCode,
                        message: "Tweet não encontrado."
                    })
                }
    
    
                return res.status(200).json({
                    success: true,
                    code: res.statusCode,
                    message: 'Tweet alualizado com sucesso',
                    data: updateUser
                })
    
            }catch(error){
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: `Erro ao listar Tweet ${error}`
                })
            }
    }
    
    public async delete(req: Request, res: Response){
            try{
                const { id, userId } = req.params
    
                const deleteUser = await repository.tweet.delete({
                    where: {id, userId},
                    select:{
                        id: true,
                        content: true,
                        type: true,
                        userId: true,
                        tweetOriginalId: true
                    }
                })

                if(!deleteUser){
                    return res.status(404).json({
                        success: false,
                        code: res.statusCode,
                        message: "Tweet não encontrado."
                    })
                }
    
                return res.status(200).json({
                    success: true,
                    code: res.statusCode,
                    message: 'Tweet deletado com sucesso',
                    data: deleteUser
                })
                
            }catch(error){
                return res.status(500).json({
                    success: false,
                    code: res.statusCode,
                    message: `Erro ao deletar Tweet ${error}`
                })
            }
    }
}