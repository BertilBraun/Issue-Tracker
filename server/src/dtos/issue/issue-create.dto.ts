import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { Priority, Status } from 'src/modules/issue/issue.entity'

export class IssueCreateDto {
  @IsNotEmpty() @IsString() title: string
  @IsNotEmpty() @IsString() description: string
  @IsOptional() @IsString() status: Status
  @IsOptional() @IsString() priority: Priority
  @IsNotEmpty() @IsNumber() projectId: number
  @IsNotEmpty() @IsUUID() authorId: string
}
