import  { Expose, Exclude } from 'class-transformer';

export class LoginRequest{
    @Expose()
    usr_email: string;
    @Exclude()
    usr_password: string;
}