import { Router } from 'express'
import CreateUserService from '../service/CreateUserService'
import { hash } from 'bcryptjs'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import multer from 'multer'
import uploadConfig from '../config/upload'
import UpdateAvatarService from '../service/UpdateAvatarService'

//receber requisição, chamar outro arquivo, dar resposta


const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
        const { name, email, password } = request.body

        const createUser = new CreateUserService()

        const hashedPassword = await hash(password, 8)

        const user = await createUser.execute(
            {
                name,
                email,
                password: hashedPassword,
            }
        )
        delete user.password
        return response.json(user)
    }
)
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

        const updateAvatar = new UpdateAvatarService()

        const user = await updateAvatar.execute({
            id: request.user.id,
            FileName: request.file.filename
        })

        delete user.password

        return response.json(user)
})

export default usersRouter