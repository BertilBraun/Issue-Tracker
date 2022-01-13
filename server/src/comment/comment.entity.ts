import { Issue } from 'src/issue/issue.entity'
import { User } from 'src/user/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  comment: string

  @ManyToOne(() => User, (user) => user.comments)
  author: User

  @ManyToOne(() => Issue, (issue) => issue.comments)
  issue: Issue
}
