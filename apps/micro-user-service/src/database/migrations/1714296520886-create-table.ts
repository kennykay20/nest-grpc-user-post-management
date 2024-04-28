import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1714296520886 implements MigrationInterface {
    name = 'CreateTable1714296520886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "firstname" character varying(500) NOT NULL, "lastname" character varying(500) NOT NULL, "username" character varying, "password" text, "phone" character varying, "imageUrl" character varying, "active" boolean NOT NULL DEFAULT true, "isDelete" boolean NOT NULL DEFAULT false, "otp" character varying, "isNewUser" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5812b33616bcec19c4567d8370" ON "users" ("firstname", "lastname", "username") `);
        await queryRunner.query(`CREATE TABLE "post" ("id" character varying NOT NULL, "content" character varying NOT NULL, "selectCategory" character varying NOT NULL, "isDelete" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" character varying, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "interaction" ("id" character varying NOT NULL, "user_id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_9204371ccb2c9dab5428b406413" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a0dfb5267901865a327971287f" ON "interaction" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a0dfb5267901865a327971287f"`);
        await queryRunner.query(`DROP TABLE "interaction"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5812b33616bcec19c4567d8370"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
