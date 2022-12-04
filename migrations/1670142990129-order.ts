import { MigrationInterface, QueryRunner } from "typeorm";

export class order1670142990129 implements MigrationInterface {
    name = 'order1670142990129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone, "channel_id" integer NOT NULL, "subscriber_id" uuid NOT NULL, "subscription_duration" integer NOT NULL, "amount" integer NOT NULL DEFAULT '0', "merchant" character varying, "merchant_order_id" character varying, "merchant_payment_link" character varying, "status" character varying NOT NULL DEFAULT 'PENDING', CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
