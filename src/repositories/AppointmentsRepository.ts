import { EntityRepository, Repository } from 'typeorm'

import Appointment from '../models/Appointment'
//Listar, deletar, adicionar, enfim, manipular o dado
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {

        const findAppointment = await this.findOne({
            where: { date: date } 
        })
        return findAppointment || null
    }
}
export default AppointmentsRepository