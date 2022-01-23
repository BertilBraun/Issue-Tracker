import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Comment } from '../comment/comment.entity'
import { Issue } from '../issue/issue.entity'
import { Project } from '../project/project.entity'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @PrimaryColumn()
  email: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  passwordHash: string

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[]

  @OneToMany(() => Issue, (issue) => issue.author)
  issues: Issue[]

  @OneToMany(() => Project, (comment) => comment.owner)
  projects: Project[]

  @CreateDateColumn()
  createdAt: Date
}
