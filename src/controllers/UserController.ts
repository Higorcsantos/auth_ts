import {Request,Response} from 'express'
import { getCustomRepository, Repository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController{
    async create(req: Request, res: Response){
        const{email, password, name} = req.body;
        const userRepository = getCustomRepository(UserRepository);
        const userExists = await userRepository.findOne({email});
        if(userExists){
            return res.status(400).json({error: 'User already exists'})
        }
        const user = userRepository.create({
            name,email,password
        });
        await userRepository.save(user);
        return res.status(200).json(user);
    }
}
export {UserController}