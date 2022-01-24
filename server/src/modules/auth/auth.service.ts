import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { AuthResponseDto } from 'src/dtos/auth/auth-response.dto'
import { UserDto } from 'src/dtos/user/user.dto'
import { UserService } from 'src/modules/user/user.service'
import { loginValidator, registerValidator } from 'src/util/validator'
import { JwtPayload } from './jwt.strategy'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const { errors, valid } = loginValidator(email, password)

    if (!valid) {
      throw new Error(JSON.stringify(errors))
    }

    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new Error('User not found.')
    }

    const passwordValid = await argon2.verify(user.passwordHash, password)

    if (!passwordValid) {
      throw new Error('Password is incorrect.')
    }

    const payload: JwtPayload = { userId: user.id }
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    }
  }

  async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponseDto> {
    const { errors, valid } = registerValidator(name, email, password)

    if (!valid) {
      throw new Error(JSON.stringify(errors))
    }

    const existingUser = await this.userService.findByEmail(email)

    if (existingUser) {
      throw new Error('User already exists')
    }

    const passwordHash = await this.hashPassword(password)

    const user = await this.userService.save(email, name, passwordHash)

    const payload: JwtPayload = { userId: user.id }
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    }
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findOne(payload.userId)
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
    return user
  }

  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password)
  }
}
