import { MigrationInterface, QueryRunner } from 'typeorm';

export class authMethods1665973158124 implements MigrationInterface {
  name = 'authMethods1665973158124';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_to_auth_method" ("id" SERIAL NOT NULL, "two_factor_temp_secret" character varying, "two_factor_secret" character varying, "userId" integer, "authMethodId" integer, CONSTRAINT "PK_0204980cf766105dfb01b55e10b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "auth_method" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a7387b7f806f012b27c2e889072" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "two_factor_auth_enable" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_auth_method" ADD CONSTRAINT "FK_606266a026298d88be45e4de1b1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_auth_method" ADD CONSTRAINT "FK_25f6b5a0e8e7b5348a45153e683" FOREIGN KEY ("authMethodId") REFERENCES "auth_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_to_auth_method" DROP CONSTRAINT "FK_25f6b5a0e8e7b5348a45153e683"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_auth_method" DROP CONSTRAINT "FK_606266a026298d88be45e4de1b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "two_factor_auth_enable"`,
    );
    await queryRunner.query(`DROP TABLE "auth_method"`);
    await queryRunner.query(`DROP TABLE "user_to_auth_method"`);
  }
}
