import { query } from "express";
import {MigrationInterface, QueryRunner} from "typeorm";

export class barberNameTobarberID1610127452123 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('appointments','barberName')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
