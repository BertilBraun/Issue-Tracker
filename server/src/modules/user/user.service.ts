import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDto } from 'src/dtos/user/user.dto'
import { convertUser, convertUserAsync } from 'src/util/dto-converter'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find()

    return users.map(convertUser)
  }

  async findOne(id: string): Promise<UserDto> {
    return convertUserAsync(
      this.usersRepository.findOne(id, {
        relations: ['comments', 'issues', 'projects'],
      }),
    )
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } })
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }

  async save(
    email: string,
    name: string,
    passwordHash: string,
  ): Promise<UserDto> {
    return convertUserAsync(
      this.usersRepository.save({
        email,
        name,
        passwordHash,
        comments: [],
        issues: [],
        projects: [],
      }),
    )
  }
}
