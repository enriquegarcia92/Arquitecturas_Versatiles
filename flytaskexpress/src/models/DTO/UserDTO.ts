import { IsEmail, IsNotEmpty, MinLength, Equals, IsString } from 'class-validator';

export class CreateUserDTO {
  name!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
}
