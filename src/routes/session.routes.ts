import { Router } from 'express'
import AuthService from '../service/AuthService'


const sessionRouter = Router()  

 sessionRouter.post('/', async (request, response) => {
        const {email, password } = request.body

        const auth = new AuthService()

        const userAuntenticated = await auth.execute({email, password})

        
        return response.json(userAuntenticated)
}
)

export default sessionRouter