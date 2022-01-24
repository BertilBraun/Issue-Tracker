import { Comment } from '../comment/comment.entity'
import { Project } from '../project/project.entity'
import { User } from '../user/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

export type Priority = 'low' | 'medium' | 'high'

export type Status = 'open' | 'in progress' | 'closed'

@Entity({ name: 'issue' })
export class Issue {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  title: string

  @Column({ nullable: false })
  description: string

  @Column({
    type: 'enum',
    enum: ['open', 'in progress', 'closed'],
    default: 'open',
  })
  status: Status

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    default: 'low',
  })
  priority: Priority

  @ManyToOne(() => User, (user) => user.issues)
  author: User

  @ManyToOne(() => Project, (project) => project.issues)
  project: Project

  @ManyToOne(() => Comment, (comment) => comment.issue)
  comments: Comment[]

  @CreateDateColumn()
  createdAt: Date

  @Column({ nullable: true })
  updatedAt: Date

  @Column({ nullable: true })
  closedAt: Date
}
