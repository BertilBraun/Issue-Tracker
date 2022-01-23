import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserService } from 'src/modules/user/user.service'
import { createProjectValidator } from 'src/util/validator'
import { Repository } from 'typeorm'
import { Project } from './project.entity'

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private userService: UserService,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find()
  }

  findOne(id: string): Promise<Project> {
    return this.projectsRepository.findOne(id, {
      relations: ['owner', 'members', 'issues'],
    })
  }

  async remove(id: string): Promise<void> {
    await this.projectsRepository.delete(id)
  }

  async save(
    projectName: string,
    ownerId: string,
    description: string,
  ): Promise<Project> {
    const { errors, valid } = createProjectValidator(projectName, description)

    if (!valid) {
      throw new Error(JSON.stringify(errors))
    }

    const owner = await this.userService.findOne(ownerId)

    if (!owner) {
      throw new Error('User not found')
    }

    return this.projectsRepository.save({
      name: projectName,
      owner,
      description,
      members: [owner],
      issues: [],
    })
  }

  async update(
    id: string,
    name?: string,
    description?: string,
  ): Promise<Project> {
    const project = await this.projectsRepository.findOne(id)

    if (!project) {
      throw new Error('Project not found')
    }

    project.name = name || project.name
    project.description = description || project.description

    return this.projectsRepository.save(project)
  }

  async addMember(projectId: string, userId: string): Promise<Project> {
    const project = await this.projectsRepository.findOne(projectId)
    const user = await this.userService.findOne(userId)

    if (!project) {
      throw new Error('Project not found')
    }
    if (!user) {
      throw new Error('User not found')
    }

    project.members.push(user)

    return this.projectsRepository.save(project)
  }
}
