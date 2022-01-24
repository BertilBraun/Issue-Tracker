import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { IssueDto } from '../issue/issue.dto'
import { UserDto } from '../user/user.dto'

export class CommentDto {
  @IsNotEmpty() @IsNumber() id: number
  @IsNotEmpty() @IsString() comment: string
  @IsOptional() issue: IssueDto
  @IsOptional() author: UserDto
  @IsNotEmpty() @IsDate() createdAt: Date
}
