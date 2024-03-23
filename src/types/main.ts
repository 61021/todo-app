export type Status = 'todo' | 'done' | 'wontdo' | 'trashed'
export type Priority = 'low' | 'medium' | 'high' | null

export interface Task {
  id: number
  title: string
  status: Status
  description?: string
  creationDate: string
  date?: string
  priority?: Priority
}

export interface Prefrences {
  sort: 'date' | 'priority'
}
