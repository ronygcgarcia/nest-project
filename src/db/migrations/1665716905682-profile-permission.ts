import { MigrationInterface, QueryRunner } from 'typeorm';

export class profilePermission1665716905682 implements MigrationInterface {
  name = 'profilePermission1665716905682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profile_permissions_permission" ("profileId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_bade127ec58cfd9237f38418551" PRIMARY KEY ("profileId", "permissionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fccb5a0bf35c780158080b4c04" ON "profile_permissions_permission" ("profileId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_398f5588c01201edc3ac8ecde8" ON "profile_permissions_permission" ("permissionId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "permission_profiles_profile" ("permissionId" integer NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_4bd881854ff4b620b6ed52bdf79" PRIMARY KEY ("permissionId", "profileId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5a6b3562d3c8a0304b03c57e8d" ON "permission_profiles_profile" ("permissionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b19fb4ba4d1d8bffac7e17310e" ON "permission_profiles_profile" ("profileId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_permissions_permission" ADD CONSTRAINT "FK_fccb5a0bf35c780158080b4c04e" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_permissions_permission" ADD CONSTRAINT "FK_398f5588c01201edc3ac8ecde86" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_profiles_profile" ADD CONSTRAINT "FK_5a6b3562d3c8a0304b03c57e8d6" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_profiles_profile" ADD CONSTRAINT "FK_b19fb4ba4d1d8bffac7e17310e1" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_profiles_profile" DROP CONSTRAINT "FK_b19fb4ba4d1d8bffac7e17310e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_profiles_profile" DROP CONSTRAINT "FK_5a6b3562d3c8a0304b03c57e8d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_permissions_permission" DROP CONSTRAINT "FK_398f5588c01201edc3ac8ecde86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_permissions_permission" DROP CONSTRAINT "FK_fccb5a0bf35c780158080b4c04e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b19fb4ba4d1d8bffac7e17310e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5a6b3562d3c8a0304b03c57e8d"`,
    );
    await queryRunner.query(`DROP TABLE "permission_profiles_profile"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_398f5588c01201edc3ac8ecde8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fccb5a0bf35c780158080b4c04"`,
    );
    await queryRunner.query(`DROP TABLE "profile_permissions_permission"`);
  }
}
