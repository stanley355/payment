import { MigrationInterface, QueryRunner } from "typeorm";

export class balance1670142157831 implements MigrationInterface {
    name = 'balance1670142157831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balance" DROP COLUMN "user_name"`);
        await queryRunner.query(`ALTER TABLE "balance" DROP COLUMN "channel_name"`);
        await queryRunner.query(`ALTER TABLE "balance" DROP COLUMN "bank_name"`);
        await queryRunner.query(`ALTER TABLE "balance" DROP COLUMN "account_number"`);
        await queryRunner.query(`ALTER TABLE "balance" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone`);
        await queryRunner.query(`ALTER TABLE "balance" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balance" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "balance" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "balance" ADD "account_number" character varying`);
        await queryRunner.query(`ALTER TABLE "balance" ADD "bank_name" character varying`);
        await queryRunner.query(`ALTER TABLE "balance" ADD "channel_name" character varying`);
        await queryRunner.query(`ALTER TABLE "balance" ADD "user_name" character varying NOT NULL`);
    }

}
