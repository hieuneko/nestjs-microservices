import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1671445944422 implements MigrationInterface {
  name = 'InitDB1671445944422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_product" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
