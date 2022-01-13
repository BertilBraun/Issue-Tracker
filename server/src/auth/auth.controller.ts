import { Controller, Post, Query } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Query('email') email: string,
    @Query('password') password: string,
  ): Promise<string> {
    return this.authService.login(email, password)
  }

  @Post('signup')
  async signUp(
    @Query('email') email: string,
    @Query('password') password: string,
  ): Promise<string> {
    return this.authService.signUp(email, password)
  }
}
