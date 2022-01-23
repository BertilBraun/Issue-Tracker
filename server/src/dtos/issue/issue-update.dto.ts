import { Priority, Status } from 'src/modules/issue/issue.entity'

export type IssueUpdateDto = {
  title?: string
  description?: string
  status?: Status
  priority?: Priority
}
