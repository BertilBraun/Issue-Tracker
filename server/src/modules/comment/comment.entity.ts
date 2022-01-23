import { Issue } from '../issue/issue.entity'
import { User } from '../user/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

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

  @CreateDateColumn()
  createdAt: Date
}
