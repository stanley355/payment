import { MigrationInterface, QueryRunner } from "typeorm";

export class withdrawal1669884382358 implements MigrationInterface {
    name = 'withdrawal1669884382358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "withdrawal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone, "user_id" uuid NOT NULL, "bank_name" character varying NOT NULL, "account_number" character varying NOT NULL, "amount" integer NOT NULL DEFAULT '0', "status" character varying NOT NULL DEFAULT 'IN_PROGRESS', "message" character varying, "balanceId" uuid, CONSTRAINT "PK_840e247aaad3fbd4e18129122a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "withdrawal" ADD CONSTRAINT "FK_50b0ddcfcf9e6549a609871e4c1" FOREIGN KEY ("balanceId") REFERENCES "balance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "withdrawal" DROP CONSTRAINT "FK_50b0ddcfcf9e6549a609871e4c1"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "withdrawal"`);
    }

}
