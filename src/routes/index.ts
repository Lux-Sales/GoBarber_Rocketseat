import { Router } from 'express'
import appointmentsRouter from './appointments.routes'
import usersRouter from './users.routes'
import sessionRouter from './session.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/auth', sessionRouter)

export default routes