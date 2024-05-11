import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11715441933277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            ` CREATE TABLE IF NOT EXISTS user
            (
                usr_id serial NOT NULL,
                usr_email VARCHAR(255) NOT NULL,
                usr_name VARCHAR(255) NOT NULL,
                usr_password VARCHAR(255) NOT NULL,
                usr_role VARCHAR(255) NOT NULL,
                CONSTRAINT user_pkey PRIMARY KEY (usr_id)
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
            );
            CREATE TABLE IF NOT EXISTS task
            (
                tsk_id serial NOT NULL,
                tsk_creation_date DATE NOT NULL,
                tsk_desc TEXT NOT NULL,
                tsk_due_date DATE NOT NULL,
                tsk_status INT NOT NULL,
                tsk_title VARCHAR(255) NOT NULL,
                usr_id bigint NOT NULL,
                CONSTRAINT task_pkey PRIMARY KEY (tsk_id)
                CONSTRAINT task_usr_id_foreign FOREIGN KEY (usr_id)
                REFERENCES public.user (usr_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
            ); 
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE user;
        DROP TABLE task;
        `
        );
    }

}
