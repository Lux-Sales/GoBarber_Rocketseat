import { uuid } from 'uuidv4'

// Como um dado é salvo na aplicação, como é composto
class Appointment {
    id: string
    
    barberName: string
    
    date: Date

    constructor({barberName, date}: Omit<Appointment,'id'>){
        this.id = uuid()
        this.barberName = barberName,
        this.date = date
    }

}

export default Appointment