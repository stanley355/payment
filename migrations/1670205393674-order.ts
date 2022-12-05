import { MigrationInterface, QueryRunner } from "typeorm";

export class order1670205393674 implements MigrationInterface {
    name = 'order1670205393674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "expired_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(0) with time zone`);
        await queryRunner.query(`ALTER TABLE "order" ADD "merchant_va_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "merchant_va_number"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "expired_at"`);
    }

}
