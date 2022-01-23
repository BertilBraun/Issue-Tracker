import { Issue } from '../issue/issue.entity'
import { User } from '../user/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'project' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @ManyToOne(() => User, (user) => user.projects)
  owner: User

  @Column({ nullable: false })
  description: string

  @ManyToOne(() => User) // TODO check if this is correct
  members: User[]

  @ManyToOne(() => Issue, (issue) => issue.project)
  issues: Issue[]

  @CreateDateColumn()
  createdAt: Date
}
