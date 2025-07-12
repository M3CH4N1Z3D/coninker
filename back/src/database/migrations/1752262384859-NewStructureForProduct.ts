import { MigrationInterface, QueryRunner } from "typeorm";

export class NewStructureForProduct1752262384859 implements MigrationInterface {
    name = 'NewStructureForProduct1752262384859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "length"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "width"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "colors"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "dimensions" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "structure_colors" character varying array`);
        await queryRunner.query(`ALTER TABLE "products" ADD "principal_colors" character varying array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "principal_colors"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "structure_colors"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "dimensions"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "colors" character varying array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "weight" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "height" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "width" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "length" numeric(10,2) NOT NULL`);
    }

}
