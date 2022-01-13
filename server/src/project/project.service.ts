import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Project } from './project.entity'

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private usersRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.usersRepository.find()
  }

  findOne(id: string): Promise<Project> {
    return this.usersRepository.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }

  save(user: Project): Promise<Project> {
    return this.usersRepository.save(user)
  }
}
