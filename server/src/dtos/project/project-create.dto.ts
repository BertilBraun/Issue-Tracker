import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class ProjectCreateDto {
  @IsNotEmpty() @IsString() name: string
  @IsNotEmpty() @IsUUID() ownerId: string
  @IsNotEmpty() @IsString() description: string
}
