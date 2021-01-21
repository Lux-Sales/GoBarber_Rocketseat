import { getRepository } from 'typeorm'
import User from '../models/User'
import AppError from '../errors/AppError'

interface Request {
    name: string,
    email: string,
    password: string
}


export default class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const exists = await userRepository.findOne({
            where: { email: email }
        })
        if (exists) {
            throw new AppError('Email already used', 401)
        }

        const user = userRepository.create({
            name,
            email,
            password,
        })

        await userRepository.save(user)

        return user

    }

}