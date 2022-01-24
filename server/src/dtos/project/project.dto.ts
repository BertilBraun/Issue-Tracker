import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { CommentDto } from '../comment/comment.dto'
import { IssueDto } from '../issue/issue.dto'
import { UserDto } from '../user/user.dto'

export class ProjectDto {
  @IsNotEmpty() @IsNumber() id: number
  @IsNotEmpty() @IsString() name: string
  @IsNotEmpty() @IsString() description: string
  @IsOptional() owner: UserDto
  @IsOptional() @IsArray() issues: IssueDto[]
  @IsOptional() @IsArray() members: UserDto[]
  @IsNotEmpty() @IsDate() createdAt: Date
}
