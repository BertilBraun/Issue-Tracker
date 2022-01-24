import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { Priority, Status } from 'src/modules/issue/issue.entity'
import { CommentDto } from '../comment/comment.dto'
import { ProjectDto } from '../project/project.dto'
import { UserDto } from '../user/user.dto'

export class IssueDto {
  @IsNotEmpty() @IsNumber() id: number
  @IsNotEmpty() @IsString() title: string
  @IsNotEmpty() @IsString() description: string
  @IsNotEmpty() @IsString() status: Status
  @IsNotEmpty() @IsString() priority: Priority
  @IsOptional() author: UserDto
  @IsOptional() project: ProjectDto
  @IsOptional() @IsArray() comments: CommentDto[]
  @IsNotEmpty() @IsDate() createdAt: Date
  @IsOptional() @IsDate() updatedAt: Date
  @IsOptional() @IsDate() closedAt: Date
}
