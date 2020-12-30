import Appointment from '../models/Appointment'
import { isEqual } from 'date-fns'

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

    public create(barberName: string, date: Date) : Appointment {
        const appointment = new Appointment(barberName, date)
        this.appointments.push(appointment)
        return appointment
    }


}
export default AppointmentsRepository