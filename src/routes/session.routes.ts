import { Router } from 'express'
import AuthService from '../service/AuthService'


const sessionRouter = Router()  

 sessionRouter.post('/', async (request, response) => {
    try {
        const {email, password } = request.body

        const auth = new AuthService()

        const userAuntenticated = await auth.execute({email, password})

        
        return response.json(userAuntenticated)
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
}
)

export default sessionRouter