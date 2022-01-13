import { Comment } from 'src/comment/comment.entity'
import { Project } from 'src/project/project.entity'
import { User } from 'src/user/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

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

  @Column({ nullable: false })
  status: string

  @Column({ nullable: false })
  priority: string

  @ManyToOne(() => Project, (project) => project.issues)
  project: Project

  @ManyToOne(() => Comment, (comment) => comment.issue)
  comments: Comment[]
}
