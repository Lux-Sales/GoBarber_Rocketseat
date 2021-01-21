import { getRepository } from 'typeorm'
import User from '../models/User'
import path from 'path'
import uploadConfig from '../config/upload'
import fs from 'fs'
import AppError from '../errors/AppError'


interface Request {
    id: string,
    FileName: string
}

class UpdateAvatarService {
    public async execute({ id, FileName }: Request): Promise<User> {
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne(id)
        console.log(user)
        if(!user){
            throw new AppError('User does not exists', 401)
        }

        if(user.avatar){
            const userAvatarPath = path.join(uploadConfig.directory, user.avatar)
            console.log(userAvatarPath)
            const userAvatarExists = await fs.promises.stat(userAvatarPath)

            if(userAvatarExists){
                await fs.promises.unlink(userAvatarPath)
            }

        }

        user.avatar = FileName

        await usersRepository.save(user)

        return user

    }
}

export default UpdateAvatarService  