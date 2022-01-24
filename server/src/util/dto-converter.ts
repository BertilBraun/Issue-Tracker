import { CommentDto, IssueDto, ProjectDto, UserDto } from 'src/dtos'
import { Comment } from 'src/modules/comment/comment.entity'
import { Issue } from 'src/modules/issue/issue.entity'
import { Project } from 'src/modules/project/project.entity'
import { User } from 'src/modules/user/user.entity'

export const convertUser = (user: User): UserDto => {
  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    comments: user.comments && user.comments.map(convertComment),
    issues: user.issues && user.issues.map(convertIssue),
    projects: user.projects && user.projects.map(convertProject),
    createdAt: user.createdAt,
  }
}

export const convertUserAsync = async (
  user: Promise<User>,
): Promise<UserDto> => {
  return convertUser(await user)
}

export const convertComment = (comment: Comment): CommentDto => {
  if (!comment) return null

  return {
    id: comment.id,
    comment: comment.comment,
    issue: comment.issue && convertIssue(comment.issue),
    author: comment.author && convertUser(comment.author),
    createdAt: comment.createdAt,
  }
}

export const convertCommentAsync = async (
  comment: Promise<Comment>,
): Promise<CommentDto> => {
  return convertComment(await comment)
}

export const convertIssue = (issue: Issue): IssueDto => {
  if (!issue) return null

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    status: issue.status,
    priority: issue.priority,
    project: issue.project && convertProject(issue.project),
    author: issue.author && convertUser(issue.author),
    comments: issue.comments && issue.comments.map(convertComment),
    createdAt: issue.createdAt,
    updatedAt: issue.updatedAt,
    closedAt: issue.closedAt,
  }
}

export const convertIssueAsync = async (
  issue: Promise<Issue>,
): Promise<IssueDto> => {
  return convertIssue(await issue)
}

export const convertProject = (project: Project): ProjectDto => {
  if (!project) return null

  return {
    id: project.id,
    name: project.name,
    description: project.description,
    owner: project.owner && convertUser(project.owner),
    members: project.members && project.members.map(convertUser),
    issues: project.issues && project.issues.map(convertIssue),
    createdAt: project.createdAt,
  }
}

export const convertProjectAsync = async (
  project: Promise<Project>,
): Promise<ProjectDto> => {
  return convertProject(await project)
}

const convertDecorator = (converterFunction: CallableFunction) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args)
      return converterFunction(result)
    }
  }
}

export const ConvertProject = convertDecorator(convertProject)
export const ConvertIssue = convertDecorator(convertIssue)
export const ConvertUser = convertDecorator(convertUser)
export const ConvertComment = convertDecorator(convertComment)
