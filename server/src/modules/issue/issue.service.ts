import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { createIssueValidator } from 'src/util/validator'
import { Repository } from 'typeorm'
import { ProjectService } from '../project/project.service'
import { UserService } from '../user/user.service'
import { Issue, Priority, Status } from './issue.entity'

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private issuesRepository: Repository<Issue>,
    private projectService: ProjectService,
    private userService: UserService,
  ) {}

  findAll(): Promise<Issue[]> {
    return this.issuesRepository.find()
  }

  findOne(id: string): Promise<Issue> {
    return this.issuesRepository.findOne(id, {
      relations: ['comments', 'comments.author', 'project', 'author'],
    })
  }

  async remove(id: string): Promise<void> {
    await this.issuesRepository.delete(id)
  }

  async save(
    title: string,
    authorId: string,
    description: string,
    status: Status,
    priority: Priority,
    projectId: string,
  ): Promise<Issue> {
    const { errors, valid } = createIssueValidator(title, description)

    if (!valid) {
      throw new Error(JSON.stringify(errors))
    }

    const project = await this.projectService.findOne(projectId)

    if (!project) {
      throw new Error('Project not found')
    }

    const author = await this.userService.findOne(authorId)

    if (!author) {
      throw new Error('Author not found')
    }

    return this.issuesRepository.save({
      title,
      author,
      description,
      status,
      priority,
      project,
      comments: [],
    })
  }

  async update(
    id: string,
    title?: string,
    description?: string,
    status?: Status,
    priority?: Priority,
  ): Promise<Issue> {
    const issue = await this.issuesRepository.findOne(id)

    if (!issue) {
      throw new Error('Issue not found')
    }

    const { errors, valid } = createIssueValidator(
      title || issue.title,
      description || issue.description,
    )

    if (!valid) {
      throw new Error(JSON.stringify(errors))
    }

    issue.title = title || issue.title
    issue.description = description || issue.description
    issue.status = status || issue.status
    issue.priority = priority || issue.priority
    issue.updatedAt = new Date()

    return this.issuesRepository.save(issue)
  }
}
