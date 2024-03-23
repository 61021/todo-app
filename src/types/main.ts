export type Status = 'todo' | 'done' | 'wontdo' | 'trashed'
export type Priority = 0 | 1 | 2 | 3

export interface Task {
  id: number
  title: string
  status: Status
  priority: Priority
  creationDate: string
  description?: string
  date?: string
}

export interface Prefrences {
  sort: 'date' | 'priority'
}
