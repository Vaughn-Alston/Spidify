export type TaskStatus =
  | 'todo'
  | 'in_progress'
  | 'blocked'
  | 'complete'

export interface Task {
  id: string
  title: string
  status: TaskStatus
}

export interface Phase {
  id: string
  title: string
  tasks: Task[]
}

export interface Project {
  id: string
  name: string
  phases: Phase[]
}
