import Appointment from '../models/Appointment'
import { startOfHour } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import { getCustomRepository } from 'typeorm'

interface receivedData {
    barberID: string,
    date: Date
}

class CreateAppointmentService {
    public async execute({ barberID, date }: receivedData): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository)

        const appointmentDate = startOfHour(date)
        
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked')
        }

        const appointment = appointmentsRepository.create({
            barberID,
            date: appointmentDate
        })

        await appointmentsRepository.save(appointment)

        return appointment
    }
}

export default CreateAppointmentService