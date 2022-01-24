import { Body, Controller, Post } from '@nestjs/common'
import { AuthLoginDto, AuthSignupDto } from 'src/dtos'
import { AuthResponseDto } from 'src/dtos/auth/auth-response.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() auth: AuthLoginDto): Promise<AuthResponseDto> {
    return this.authService.login(auth.email, auth.password)
  }

  @Post('signup')
  async signUp(@Body() auth: AuthSignupDto): Promise<AuthResponseDto> {
    return this.authService.signUp(auth.name, auth.email, auth.password)
  }
}
