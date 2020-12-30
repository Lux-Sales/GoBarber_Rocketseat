import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (req,resp)=>{
    const appointments = appointmentsRepository.getAll()
    return resp.json(appointments)
})


appointmentsRouter.post('/', (request, response) => {
    const { barberName, date } = request.body

    const parsedDate = startOfHour(parseISO(date))
    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate)

    if(findAppointmentInSameDate){
        return response.status(400).json({message:"This appointment is already booked"})
    }

    const appointment = appointmentsRepository.create(barberName, parsedDate)

    return response.json(appointment)
})

export default appointmentsRouter