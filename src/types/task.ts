export interface Task {
  id: string
  title: string
  completed: boolean
  important: boolean
  dueDate: string | null
  reminder: string | null
  createdAt: string
  assigned?: boolean
  notes?: string | null
  steps?: {
    id: string
    text: string
    completed: boolean
  }[]
} 