import { Issue } from 'src/issue/issue.entity'
import { User } from 'src/user/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

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
}
