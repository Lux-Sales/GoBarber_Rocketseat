import Appointment from '../models/Appointment'
import {startOfHour} from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface receivedData{
    barberName: string,
    date:Date
}

class CreateAppointmentService{
    private appointmentsRepository : AppointmentsRepository;
    constructor(appointmentsRepository: AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository
    }
public execute({barberName, date}: receivedData): Appointment {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

    if(findAppointmentInSameDate){
        throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository.create({
        barberName,
        date:appointmentDate
    })

    return appointment
}
}

export default CreateAppointmentService