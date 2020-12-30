import { Router } from 'express'
import { parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../service/CreateAppointmentService'

//receber requisição, chamar outro arquivo, dar resposta

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (req,resp)=>{
    const appointments = appointmentsRepository.getAll()
    return resp.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {

    try{
        const { barberName, date } = request.body
        
        const parsedDate = parseISO(date)
        
        const createAppointmentService = new CreateAppointmentService(appointmentsRepository)
        
        const appointment = createAppointmentService.execute({date: parsedDate, barberName})
        
        return response.json(appointment)
    }
    catch(error){
        response.status(400).json({error: error.message})
    }
})

export default appointmentsRouter