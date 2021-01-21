import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export default class AddAVatarFieldToUsers1611166266825 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable:true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('users', 'avatar')
    }

}
