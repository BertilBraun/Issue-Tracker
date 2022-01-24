import { IsNotEmpty, IsString } from 'class-validator'
import { UserDto } from '..'

export class AuthResponseDto {
  @IsNotEmpty() @IsString() accessToken: string

  @IsNotEmpty() user: UserDto
}
