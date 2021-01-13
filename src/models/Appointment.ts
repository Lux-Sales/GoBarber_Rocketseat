import {
Entity,
PrimaryGeneratedColumn,
Column,
CreateDateColumn,
UpdateDateColumn,
ManyToOne,
JoinColumn
} from 'typeorm'
import User from './User'
// Como um dado é salvo na aplicação, como é composto
@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    barberID: string

    @ManyToOne(() => User)
    @JoinColumn({name: 'barberID'})
    barber: User

    @Column('timestamp with time zone')
    date: Date

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Appointment