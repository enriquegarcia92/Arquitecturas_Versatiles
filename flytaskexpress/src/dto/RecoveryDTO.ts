import {Expose} from 'class-transformer';

export class RecoveryDTO{
    @Expose()
    usr_password: string;
    @Expose()
    token: string;
}