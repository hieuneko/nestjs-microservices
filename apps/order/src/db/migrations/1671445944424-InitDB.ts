import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1671445944422 implements MigrationInterface {
  name = 'InitDB1671445944422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "user_id" INT NOT NULL, "product_id" INT NOT NULL, CONSTRAINT "PK_order" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "orders"`);
  }
}
