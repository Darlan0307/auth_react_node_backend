import { Request, Response } from "express";
import { prisma } from "../services/prisma";
import bcrypt from 'bcryptjs'

export class UserController{
  async createUser(req:Request,res:Response){
    try {
      const {email,password} = req.body

      // Verificando se user ja existe
      const userExists = await prisma.user.findUnique({where:{email}})

      if(userExists)return res.status(401).json({message: "Email ja existe no nosso banco de dados"})

      // Criptografando a senha
      const hash_password = (await bcrypt.hash(password,8)).toString()

      const user = await prisma.user.create({
        data:{
          email,
          password:hash_password
        }
      })

      res.json({user})

    } catch (error) {
      return res.json({message: "Erro ao tentar acessar o banco de dados"})
    }
  }

  async listerUsers(req:Request,res:Response){
    try {

      const users = await prisma.user.findMany()

      res.json({users})

    } catch (error) {
      return res.json({message: "Erro ao tentar acessar o banco de dados"})
    }
  }  
}
