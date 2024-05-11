import { Expose } from 'class-transformer';

export class EditTaskDTO{
    @Expose()
    tsk_title: string;
    @Expose()
    tsk_desc: string;
    @Expose()
    tsk_due_date: Date;
}