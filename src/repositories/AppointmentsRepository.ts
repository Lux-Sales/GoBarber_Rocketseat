import Appointment from '../models/Appointment'
import { isEqual } from 'date-fns'

//Listar, deletar, adicionar, enfim, manipular o dado

interface CreateAppointmentDTO{
    barberName: string
    date:Date
}
class AppointmentsRepository {
    private appointments: Appointment[]

    constructor() {
        this.appointments = []
    }

    public getAll(): Appointment[]{
        return this.appointments
    }

    public findByDate(date: Date) : Appointment | null{
        const appointment = this.appointments.find(appointment => isEqual(date, appointment.date))

        return appointment || null
    }

    public create({barberName, date} : CreateAppointmentDTO) : Appointment {
        const appointment = new Appointment({barberName, date})
        this.appointments.push(appointment)
        return appointment
    }


}
export default AppointmentsRepository