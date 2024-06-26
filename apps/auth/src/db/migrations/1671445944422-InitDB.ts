import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1671445944422 implements MigrationInterface {
  name = 'InitDB1671445944422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL unique, "password" text NOT NULL, CONSTRAINT "PK_user" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
