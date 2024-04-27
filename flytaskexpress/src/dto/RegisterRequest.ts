import { Exclude, Expose} from 'class-transformer';

export class RegisterRequest{
    @Expose()
    usr_email: string;
    @Expose()
    usr_name: string;
    @Exclude()
    usr_password: string;
}