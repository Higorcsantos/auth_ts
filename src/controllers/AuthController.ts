import {Request,Response} from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class AuthController{
    async authenticate(req: Request,res: Response){
        const repository = getCustomRepository(UserRepository);
        const {email,password} = req.body;
        const user = await repository.findOne({email});
        const secret = process.env.Auth;
        
        
        if(!user){
            return res.status(401).json({error: "Usuário não encontrado"})
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            return res.status(400).json({error: "Senha incorreta"});
            }
        const token = jwt.sign({id: user.id},process.env.Auth, {expiresIn: '1d'});
        delete user.password;
        return res.json({
            user,
            token
        })
    }
}

export {AuthController}