import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class BarberNameTobarberID1610127525043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('appointments', 'barberName')
        queryRunner.addColumn('appointments', new TableColumn({
            name: 'barberID',
            type: 'uuid',
            isNullable: true
        }))

        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentBarber',
                columnNames: ['barberID'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentBarber')
        await queryRunner.dropColumn('appointments', 'barberID')

        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'barberName',
            type: 'varchar',
            isNullable: true
        }))

    }

}
