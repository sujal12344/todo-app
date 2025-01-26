import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task } from '@/types/task'

interface TaskState {
  tasks: Task[]
  addTask: (task: Task) => void
  toggleTaskComplete: (taskId: string) => void
  toggleTaskImportant: (taskId: string) => void
  getTodayTasks: () => Task[]
  getImportantTasks: () => Task[]
  getPlannedTasks: () => Task[]
  getAssignedTasks: () => Task[]
  deleteAllTasks: () => void
  updateTask: (updatedTask: Task) => void
  deleteTask: (taskId: string) => void
  selectedTask: Task | null
  setSelectedTask: (task: Task | null) => void
  duplicateTask: (taskId: string) => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (task) => 
        set((state) => ({ 
          tasks: [...state.tasks, task] 
        })),

      deleteAllTasks: () =>
        set({ tasks: [] }),

      toggleTaskComplete: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        })),
      
      toggleTaskImportant: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, important: !task.important } : task
          ),
        })),

      getTodayTasks: () => {
        const today = new Date().toISOString().split('T')[0]
        return get().tasks.filter(task => task.dueDate === today)
      },

      getImportantTasks: () => {
        return get().tasks.filter(task => task.important)
      },

      getPlannedTasks: () => {
        return get().tasks.filter(task => task.dueDate !== null)
      },

      getAssignedTasks: () => {
        // Implement your assigned tasks logic here
        return get().tasks.filter(task => task.assigned)
      },

      updateTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

      selectedTask: null,

      setSelectedTask: (task) => set({ selectedTask: task }),

      duplicateTask: (taskId) =>
        set((state) => {
          const taskToDuplicate = state.tasks.find((task) => task.id === taskId)
          if (!taskToDuplicate) return state

          const duplicatedTask = {
            ...taskToDuplicate,
            id: Date.now().toString(),
            title: `${taskToDuplicate.title} (copy)`,
            createdAt: new Date().toISOString(),
          }

          return {
            tasks: [...state.tasks, duplicatedTask],
          }
        }),
    }),
    {
      name: 'task-store',
    }
  )
) 