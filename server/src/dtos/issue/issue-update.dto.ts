import { IsOptional, IsString } from 'class-validator'
import { Priority, Status } from 'src/modules/issue/issue.entity'

export class IssueUpdateDto {
  @IsOptional() @IsString() title: string
  @IsOptional() @IsString() description: string
  @IsOptional() @IsString() status: Status
  @IsOptional() @IsString() priority: Priority
}
