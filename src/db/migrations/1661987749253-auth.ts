import { MigrationInterface, QueryRunner } from "typeorm";

export class auth1661987749253 implements MigrationInterface {
    name = 'auth1661987749253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "active" boolean NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_profiles_profile" ("userId" integer NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_3fd612037483bb43de64c850b0e" PRIMARY KEY ("userId", "profileId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f242c0b590e77b91136f23e40b" ON "user_profiles_profile" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_39cce0bc4925eb8a93ac1420de" ON "user_profiles_profile" ("profileId") `);
        await queryRunner.query(`CREATE TABLE "user_permissions_permission" ("userId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_8dd49853fbad35f9a0f91b11877" PRIMARY KEY ("userId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5b72d197d92b8bafbe7906782e" ON "user_permissions_permission" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c43a6a56e3ef281cbfba9a7745" ON "user_permissions_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user_profiles_profile" ADD CONSTRAINT "FK_f242c0b590e77b91136f23e40bd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_profiles_profile" ADD CONSTRAINT "FK_39cce0bc4925eb8a93ac1420dee" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_c43a6a56e3ef281cbfba9a77457" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_c43a6a56e3ef281cbfba9a77457"`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec"`);
        await queryRunner.query(`ALTER TABLE "user_profiles_profile" DROP CONSTRAINT "FK_39cce0bc4925eb8a93ac1420dee"`);
        await queryRunner.query(`ALTER TABLE "user_profiles_profile" DROP CONSTRAINT "FK_f242c0b590e77b91136f23e40bd"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c43a6a56e3ef281cbfba9a7745"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5b72d197d92b8bafbe7906782e"`);
        await queryRunner.query(`DROP TABLE "user_permissions_permission"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39cce0bc4925eb8a93ac1420de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f242c0b590e77b91136f23e40b"`);
        await queryRunner.query(`DROP TABLE "user_profiles_profile"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
