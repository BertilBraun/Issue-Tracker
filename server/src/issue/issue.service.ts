import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Issue } from './issue.entity'

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private usersRepository: Repository<Issue>,
  ) {}

  findAll(): Promise<Issue[]> {
    return this.usersRepository.find()
  }

  findOne(id: string): Promise<Issue> {
    return this.usersRepository.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }

  save(user: Issue): Promise<Issue> {
    return this.usersRepository.save(user)
  }
}
