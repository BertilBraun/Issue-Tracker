import { Comment } from 'src/comment/comment.entity'
import { Issue } from 'src/issue/issue.entity'
import { Project } from 'src/project/project.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  password: string

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[]

  @OneToMany(() => Issue, (issue) => issue.author)
  issues: Issue[]

  @OneToMany(() => Project, (comment) => comment.owner)
  projects: Project[]
}
