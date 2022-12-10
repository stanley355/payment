import { MigrationInterface, QueryRunner } from "typeorm";

export class payment1670402935521 implements MigrationInterface {
    name = 'payment1670402935521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" RENAME COLUMN "platform_free" TO "platform_fee"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" RENAME COLUMN "platform_fee" TO "platform_free"`);
    }

}
