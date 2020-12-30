import { uuid } from 'uuidv4'

class Appointment {
    id: string
    
    barberName: string
    
    date: Date

    constructor(barberName:string, date:Date) {
        this.id = uuid()
        this.barberName = barberName,
        this.date = date
    }

}

export default Appointment