import { Expose } from 'class-transformer';


export class AuthResponse {
    @Expose()
    token: string;
    @Expose()
    name: string;
}