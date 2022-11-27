import { MigrationInterface, QueryRunner } from "typeorm";

export class payment1669536373133 implements MigrationInterface {
    name = 'payment1669536373133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "merchant" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "merchant"`);
    }

}
