import { Comment } from 'src/comment/comment.entity'
import { Project } from 'src/project/project.entity'
import { User } from 'src/user/user.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

type Priority = 'low' | 'medium' | 'high'

type Status = 'open' | 'in progress' | 'closed'

@Entity({ name: 'issue' })
export class Issue {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  title: string

  @ManyToOne(() => User, (user) => user.issues)
  author: User

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
