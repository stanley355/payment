import { MigrationInterface, QueryRunner } from "typeorm";

export class payment1670402314670 implements MigrationInterface {
    name = 'payment1670402314670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_7e6118164ed8ce23ad5d9b9f38b"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "subscriber_id"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "subscription_duration"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "merchant"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "expired_at"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "merchant_order_id"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "merchant_payment_link"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "balanceId"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "order_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "balance_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "net_amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "platform_free" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "platform_free"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "net_amount"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "balance_id"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "balanceId" uuid`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "status" character varying DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "merchant_payment_link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "merchant_order_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "expired_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "merchant" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "subscription_duration" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "subscriber_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_7e6118164ed8ce23ad5d9b9f38b" FOREIGN KEY ("balanceId") REFERENCES "balance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
