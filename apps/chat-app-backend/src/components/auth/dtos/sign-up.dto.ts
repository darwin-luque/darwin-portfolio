import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// Sign up dto
export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsString()
  @IsNotEmpty()
  username: string;
}
