import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { CommentDto } from '../comment/comment.dto'
import { IssueDto } from '../issue/issue.dto'
import { ProjectDto } from '../project/project.dto'

export class UserDto {
  @IsNotEmpty() @IsUUID() id: string
  @IsNotEmpty() @IsEmail() email: string
  @IsNotEmpty() @IsString() name: string
  @IsOptional() @IsArray() comments: CommentDto[]
  @IsOptional() @IsArray() issues: IssueDto[]
  @IsOptional() @IsArray() projects: ProjectDto[]
  @IsNotEmpty() @IsDate() createdAt: Date
}
