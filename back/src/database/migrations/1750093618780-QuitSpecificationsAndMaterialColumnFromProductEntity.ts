import { MigrationInterface, QueryRunner } from "typeorm";

export class QuitSpecificationsAndMaterialColumnFromProductEntity1750093618780 implements MigrationInterface {
    name = 'QuitSpecificationsAndMaterialColumnFromProductEntity1750093618780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "specifications"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "materials"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "materials" jsonb`);
        await queryRunner.query(`ALTER TABLE "products" ADD "specifications" jsonb`);
    }

}
