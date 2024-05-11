import { Expose } from 'class-transformer';

export class TaskDTO{
    @Expose()
    tsk_title: string;
    @Expose()
    tsk_desc: string;
    @Expose()
    tsk_due_date: Date;
    @Expose()
    usr_id: number;
}