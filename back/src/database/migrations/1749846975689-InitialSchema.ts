import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1749846975689 implements MigrationInterface {
    name = 'InitialSchema1749846975689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(1024) NOT NULL, "password" character varying(20), CONSTRAINT "UQ_a026be7ca12f8999cbdf96dec20" UNIQUE ("name"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a026be7ca12f8999cbdf96dec2" ON "admin" ("name") `);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(1024) NOT NULL, "full-description" character varying(1024), "price" integer NOT NULL, "images" character varying(1024) array, "videos" character varying(1024) array, "stock" integer, "rating" numeric, "reviews" jsonb, "length" numeric(10,2) NOT NULL, "width" numeric(10,2) NOT NULL, "height" numeric(10,2) NOT NULL, "weight" numeric(10,2) NOT NULL, "specifications" jsonb, "materials" jsonb, "colors" character varying array NOT NULL, "isFeatured" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4c9fb58de893725258746385e1" ON "products" ("name") `);
        await queryRunner.query(`CREATE TABLE "products_categories_categories" ("productsId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_8fd95511a998d598ff66d500933" PRIMARY KEY ("productsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_40e7da0284a5389344605de8da" ON "products_categories_categories" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e1d833224b5be535323207473f" ON "products_categories_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_40e7da0284a5389344605de8dab" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" ADD CONSTRAINT "FK_e1d833224b5be535323207473f1" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_e1d833224b5be535323207473f1"`);
        await queryRunner.query(`ALTER TABLE "products_categories_categories" DROP CONSTRAINT "FK_40e7da0284a5389344605de8dab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1d833224b5be535323207473f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_40e7da0284a5389344605de8da"`);
        await queryRunner.query(`DROP TABLE "products_categories_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4c9fb58de893725258746385e1"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a026be7ca12f8999cbdf96dec2"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
