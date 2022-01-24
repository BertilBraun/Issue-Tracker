import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class CommentCreateDto {
  @IsNotEmpty() @IsString() comment: string
  @IsNotEmpty() @IsNumber() issueId: number
  @IsNotEmpty() @IsUUID() authorId: string
}
