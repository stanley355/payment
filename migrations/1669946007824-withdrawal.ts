import { MigrationInterface, QueryRunner } from "typeorm";

export class withdrawal1669946007824 implements MigrationInterface {
    name = 'withdrawal1669946007824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "withdrawal" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone`);
        await queryRunner.query(`ALTER TABLE "withdrawal" ADD "account_owner_name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "withdrawal" DROP COLUMN "account_owner_name"`);
        await queryRunner.query(`ALTER TABLE "withdrawal" DROP COLUMN "updated_at"`);
    }

}
