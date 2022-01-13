import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  async login(email: string, password: string): Promise<string> {
    return 'token' // TODO: implement
  }

  async signUp(email: string, password: string): Promise<string> {
    return 'token' // TODO: implement
  }
}
