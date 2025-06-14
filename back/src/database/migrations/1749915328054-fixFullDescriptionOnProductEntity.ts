import { MigrationInterface, QueryRunner } from "typeorm";

export class FixFullDescriptionOnProductEntity1749915328054 implements MigrationInterface {
    name = 'FixFullDescriptionOnProductEntity1749915328054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "full-description" TO "full_description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "full_description" TO "full-description"`);
    }

}
