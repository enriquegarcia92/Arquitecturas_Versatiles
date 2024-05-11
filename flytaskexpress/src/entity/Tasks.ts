import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
export class Task{
    @PrimaryGeneratedColumn()
    tsk_id: number;

    @Column()
    tsk_creation_date: Date;

    @Column()
    tsk_desc: string;

    @Column()
    tsk_due_date: Date;

    @Column()
    tsk_status: number;

    @Column() 
    tsk_title: string;

    @Column()
    usr_id: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "usr_id"})
    user: User;
}