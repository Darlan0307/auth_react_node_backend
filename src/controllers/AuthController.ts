import { Request, Response } from "express";
import { prisma } from "../services/prisma";
import bcrypt from 'bcryptjs';
import jsonwebtoken from "jsonwebtoken";

export class AuthController{
  async authUser(req:Request,res:Response){
    try {
      const {email,password} = req.body

      // Verificando email
      const userExists = await prisma.user.findUnique({where:{email}})

      if(!userExists)return res.status(401).json({message: "E-mail inválido"})

      // Verificando senha
      const isValuePassword = await bcrypt.compare(password,userExists.password)

      if(!isValuePassword) return res.status(401).json({error:"Senha inválida"})

      const secret = process.env.SECRET

      const token = jsonwebtoken.sign({id:userExists.id},`${secret}`,{expiresIn:"1d"})

      const {id} = userExists

      res.status(200).json({user:{id,email},token})

    } catch (error) {
      return res.json({message: "Erro ao tentar acessar o banco de dados"})
    }
  }
}