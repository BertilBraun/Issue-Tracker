import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserService } from 'src/modules/user/user.service'
import { loginValidator, registerValidator } from 'src/util/validator'

@Injectable()
export class AuthService {
  private JWT_SECRET: string

  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    this.JWT_SECRET = this.configService.get<string>('JWT_SECRET')
  }

  async login(email: string, password: string): Promise<string> {
    const { errors, valid } = loginValidator(email, password)

    if (!valid) {
      throw new Error(JSON.stringify(errors))
    }

    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new Error('User not found.')
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash)

    if (!passwordValid) {
      throw new Error('Password is incorrect.')
    }

    return jwt.sign({ userId: user.id }, this.JWT_SECRET)
  }

  async signUp(name: string, email: string, password: string): Promise<string> {
    const { errors, valid } = registerValidator(name, email, password)

    if (!valid) {
      throw new Error(JSON.stringify(errors))
    }

    const existingUser = await this.userService.findByEmail(email)

    if (existingUser) {
      throw new Error('User already exists')
    }

    const passwordHash = await this.hashPassword(password)

    const user = await this.userService.save(name, email, passwordHash)

    return jwt.sign({ userId: user.id }, this.JWT_SECRET)
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
  }
}
