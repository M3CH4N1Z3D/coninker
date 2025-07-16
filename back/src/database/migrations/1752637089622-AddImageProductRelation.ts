import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageProductRelation1752637089622 implements MigrationInterface {
    name = 'AddImageProductRelation1752637089622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "configImage" ADD "order" integer`);
        await queryRunner.query(`ALTER TABLE "configImage" ADD "product_id" uuid`);
        await queryRunner.query(`ALTER TABLE "configImage" ADD CONSTRAINT "FK_d35940a27f4005313e127a40764" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "configImage" DROP CONSTRAINT "FK_d35940a27f4005313e127a40764"`);
        await queryRunner.query(`ALTER TABLE "configImage" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "configImage" DROP COLUMN "order"`);
    }

}
