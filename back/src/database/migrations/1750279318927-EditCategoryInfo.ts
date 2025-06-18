import { MigrationInterface, QueryRunner } from "typeorm";

export class EditCategoryInfo1750279318927 implements MigrationInterface {
    name = 'EditCategoryInfo1750279318927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "title" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "image" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying(5000)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "name" character varying(255) NOT NULL`);
    }

}
