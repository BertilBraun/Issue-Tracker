import { Priority, Status } from 'src/modules/issue/issue.entity'

export type IssueCreateDto = {
  title: string
  description: string
  status: Status
  priority: Priority
  projectId: string
  authorId: string
}
