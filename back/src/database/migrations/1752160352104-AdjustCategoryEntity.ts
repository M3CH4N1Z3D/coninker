import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustCategoryEntity1752160352104 implements MigrationInterface {
    name = 'AdjustCategoryEntity1752160352104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "configImage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(1024), "key" character varying(1024), "description" character varying(1024), "image" character varying(1024), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6f18b30bef4ef59d864e837afd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "parent_id" uuid`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_88cea2dc9c31951d06437879b40" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_88cea2dc9c31951d06437879b40"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "parent_id"`);
        await queryRunner.query(`DROP TABLE "configImage"`);
    }

}
