import { MigrationInterface, QueryRunner } from "typeorm";

export class balance1666751754264 implements MigrationInterface {
    name = 'balance1666751754264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "balance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "user_name" character varying NOT NULL, "channel_id" integer, "channel_name" character varying, "amount" integer NOT NULL DEFAULT '0', "bank_name" character varying, "account_number" character varying, CONSTRAINT "PK_079dddd31a81672e8143a649ca0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "balance"`);
    }

}
