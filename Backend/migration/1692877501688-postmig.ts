import { MigrationInterface, QueryRunner } from "typeorm"

export class Postmig1692877501688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "posts" CHANGE "content" content LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
