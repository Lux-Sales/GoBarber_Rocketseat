import { getCustomRepository } from 'typeorm'
import { Router } from 'express'
import { parseISO } from 'date-fns'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../service/CreateAppointmentService'

//receber requisição, chamar outro arquivo, dar resposta

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async(req, resp) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointments = await appointmentsRepository.find();

    return resp.json(appointments);
});

appointmentsRouter.post('/',  async (request, response) => {

        const { barberID, date } = request.body
        
        const parsedDate = parseISO(date)
        
        const createAppointmentService = new CreateAppointmentService()
        
        const appointment = await createAppointmentService.execute({ date: parsedDate, barberID })
        
        return response.json(appointment)
}
)

export default appointmentsRouter