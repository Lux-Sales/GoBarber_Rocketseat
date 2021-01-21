import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'

interface tokenPayload {
    iat: number,
    exp: number,
    sub: string
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('There is no token assigned', 401)
    }

    const [, token] = authHeader.split(' ')

        const decoded = verify(token, authConfig.jwt.secret)

        if(!decoded){
            throw new AppError('Invalid JWT token', 401)
        }

        const { sub } = decoded as tokenPayload

        request.user = {
            id: sub
        }

        return next()


}