import { IsEmail } from 'class-validator';

export class MagicLinkLoginDto {
  @IsEmail()
  destination: string;
}
