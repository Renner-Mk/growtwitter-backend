import { Request, Response } from "express";
import { repository } from "../database/prisma.connection";
import { User } from "../models/user.model";

export class UserController{
    public async index(req: Request, res: Response){
        try{
            const users = await repository.user.findMany({
                select: {
                    id: true,
                    name: true,
                    username: true
                }
            })

            if(users.length === 0){
                return res.status(200).json({
                    success: true,
                    code: res.statusCode,
                    message: 'Não há usuários registrados!!',
                })
            }

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Usuarios listados com sucesso!!',
                data: users
            })
        }catch(error){
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao listar alunos ${error}`
            })
        }
    }

    public async show(req: Request, res: Response){
        try{
            const { userId } = req.params

            const student = await repository.user.findUnique({
                where: {id: userId},
                select:{
                    id: true,
                    name: true,
                    email: true,
                    username: true
                }
            })

            if(!student){
                return res.status(404).json({message: 'Usuario não encontrado'})
            }
    
            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Usuario listado com sucesso',
                data: student
            })
        }catch(error){
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao listar alunos ${error}`
            })
        }
    }

    public async create(req: Request, res: Response){
        try{
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

            const newUser = new User(name, email, password, username)

            const createdUser = await repository.user.create({
                data:{
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    password: newUser.password,
                    username: newUser.username
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                }
            })

            return res.status(201).json({
                success: true,
                code: res.statusCode,
                message: 'Usuario criado com sucesso!',
                data: createdUser
            })
        }catch(error){
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao criar usuario ${error}`
            })
        }
    }

    public async update(req: Request, res: Response){
        try{
            const { userId } = req.params
            const { name, email, password, username} = req.body

            if(!name || !email || !password || !username){
                return res.status(400).json({
                    success: false,
                    code: res.statusCode,
                    message: 'Preencha todos os campos obrigatórios'
                })
            }

            const updateUser = await repository.user.update({
                where: {id: userId},
                data: {
                    name,
                    email,
                    password,
                    username
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true
                }
            })


            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Usuário alualizado com sucesso',
                data: updateUser
            })

        }catch(error){
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao listar alunos ${error}`
            })
        }
    }

    public async delete(req: Request, res: Response){
        try{
            const { id } = req.params

            const deleteUser = await repository.user.delete({
                where: {id},
                select:{
                    id: true,
                    name: true,
                    email: true,
                    username: true
                }
            })

            return res.status(200).json({
                success: true,
                code: res.statusCode,
                message: 'Usuário deletado com sucesso',
                data: deleteUser
            })
            
        }catch(error){
            return res.status(500).json({
                success: false,
                code: res.statusCode,
                message: `Erro ao listar alunos ${error}`
            })
        }
    }
}