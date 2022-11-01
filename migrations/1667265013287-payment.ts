import { MigrationInterface, QueryRunner } from "typeorm";

export class payment1667265013287 implements MigrationInterface {
    name = 'payment1667265013287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "channel_id" integer NOT NULL, "channel_name" character varying NOT NULL, "subscriber_id" uuid NOT NULL, "subscriber_name" character varying NOT NULL, "subscription_duration" integer NOT NULL, "total_amount" integer NOT NULL, "channel_net_income" integer NOT NULL, "platform_fee" integer NOT NULL, "channelBalanceIdId" uuid, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_ed67b09bedab4cde1b97233ca5a" FOREIGN KEY ("channelBalanceIdId") REFERENCES "balance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_ed67b09bedab4cde1b97233ca5a"`);
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}
