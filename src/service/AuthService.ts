import { getRepository } from 'typeorm'
import User from '../models/User'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authconfig from '../config/auth'
import AppError from '../errors/AppError'

interface Request {
    email: string,
    password: string
}
interface Response{
    user:User,
    token:string
}

export default class AuthService {
    public async execute({ email, password }: Request): Promise<Response> {
        const userRepository = getRepository(User)

        const user = await userRepository.findOne({ where: { email } })

        if (!user) {
            throw new AppError('Invalid email address or password')
        }

        const validPassword = await compare(password, user.password)

        if (!validPassword) {
            throw new AppError('Invalid email address or password')
        }
        const { secret, expiresIn} = authconfig.jwt

            const token = sign({}, secret, {
                subject: user.id,
                expiresIn
            })

        delete user.password

        return {user,token}



    }
}