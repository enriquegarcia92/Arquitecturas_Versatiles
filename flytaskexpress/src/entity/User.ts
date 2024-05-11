import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Tasks";
@Entity("user")
export class User{
    @PrimaryGeneratedColumn()
    usr_id: number;

    @Column()
    usr_email: string;

    @Column()
    usr_name: string;

    @Column()
    usr_password: string;

    @Column()
    usr_role: string;
    
    @OneToMany(() => Task, task => task.tsk_id)
    tasks: Task[];
}