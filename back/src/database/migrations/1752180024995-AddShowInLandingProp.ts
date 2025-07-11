import { MigrationInterface, QueryRunner } from "typeorm";

export class AddShowInLandingProp1752180024995 implements MigrationInterface {
    name = 'AddShowInLandingProp1752180024995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "showInLanding" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "showInLanding"`);
    }

}
