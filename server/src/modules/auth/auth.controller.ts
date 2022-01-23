import { Body, Controller, Post } from '@nestjs/common'
import { AuthLoginDto, AuthSignupDto } from 'src/dtos'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() auth: AuthLoginDto): Promise<string> {
    return this.authService.login(auth.email, auth.password)
  }

  @Post('signup')
  async signUp(@Body() auth: AuthSignupDto): Promise<string> {
    return this.authService.signUp(auth.name, auth.email, auth.password)
  }
}
