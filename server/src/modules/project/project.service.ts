import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProjectDto } from 'src/dtos/project/project.dto'
import { UserService } from 'src/modules/user/user.service'
import {
  ConvertProject,
  convertProject,
  convertProjectAsync,
} from 'src/util/dto-converter'
import { createProjectValidator } from 'src/util/validator'
import { Repository } from 'typeorm'
import { User } from '../user/user.entity'
import { Project } from './project.entity'

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<ProjectDto[]> {
    const projects = await this.projectsRepository.find()

    return projects.map(convertProject)
  }

  @ConvertProject // TODO check if this works, if so, add decorators everywhere
  async findOne(id: number): Promise<ProjectDto> {
    return this.projectsRepository.findOne(id, {
      relations: ['owner', 'members', 'issues'],
    })
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id)
  }

  async save(
    projectName: string,
    ownerId: string,
    description: string,
  ): Promise<ProjectDto> {
    const { errors, valid } = createProjectValidator(projectName, description)

    if (!valid) {
      throw new Error(JSON.stringify(errors))
    }

    const owner = await this.userService.findOne(ownerId)

    if (!owner) {
      throw new Error('User not found')
    }

    return convertProjectAsync(
      this.projectsRepository.save({
        name: projectName,
        owner,
        description,
        members: [owner],
        issues: [],
      }),
    )
  }

  async update(
    id: number,
    name?: string,
    description?: string,
  ): Promise<ProjectDto> {
    const project = await this.projectsRepository.findOne(id)

    if (!project) {
      throw new Error('Project not found')
    }

    project.name = name || project.name
    project.description = description || project.description

    return convertProjectAsync(this.projectsRepository.save(project))
  }

  async addMember(projectId: number, userId: string): Promise<ProjectDto> {
    const project = await this.projectsRepository.findOne(projectId)
    const user = await this.usersRepository.findOne(userId)

    if (!project) {
      throw new Error('Project not found')
    }
    if (!user) {
      throw new Error('User not found')
    }

    project.members.push(user)

    return convertProjectAsync(this.projectsRepository.save(project))
  }
}
