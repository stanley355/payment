import { MigrationInterface, QueryRunner } from "typeorm";

export class payment1669625502063 implements MigrationInterface {
    name = 'payment1669625502063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_ed67b09bedab4cde1b97233ca5a"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "channel_name"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "subscriber_name"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "channel_net_income"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "platform_fee"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "channelBalanceIdId"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "expired_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "merchant_order_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "merchant_payment_link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "balanceId" uuid`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "created_at" SET DEFAULT ('now'::text)::timestamp(0) with time zone`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "merchant" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_7e6118164ed8ce23ad5d9b9f38b" FOREIGN KEY ("balanceId") REFERENCES "balance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_7e6118164ed8ce23ad5d9b9f38b"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "merchant" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "created_at" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "balanceId"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "merchant_payment_link"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "merchant_order_id"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "expired_at"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "channelBalanceIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "platform_fee" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "channel_net_income" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "subscriber_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "channel_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_ed67b09bedab4cde1b97233ca5a" FOREIGN KEY ("channelBalanceIdId") REFERENCES "balance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
