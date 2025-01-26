import { Task } from '@/types/task'
import { Star, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import TaskEditor from './TaskEditor'
import { useTaskStore } from '@/store/taskStore'
import { useUIStore } from '@/store/uiStore'

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (taskId: string) => void
  onToggleImportant: (taskId: string) => void
}

const TaskList = ({ tasks, onToggleComplete, onToggleImportant }: TaskListProps) => {
  const { selectedTask, setSelectedTask } = useTaskStore()
  const { isLayoutGrid } = useUIStore()

  if (tasks.length === 0) {
    return (
      <div className="p-4">
        <p className="text-sm text-muted-foreground">No tasks yet. Add one above!</p>
      </div>
    )
  }

  return (
    <div
      className={`
        ${isLayoutGrid 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4' 
          : 'divide-y-2 divide-[#496E4B]/20 dark:divide-[#496E4B]'
        }
      `}
    >
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`flex items-center justify-between p-4 transition-transform text-black dark:text-white ${isLayoutGrid ? "border-2 border-[#496E4B]/20 dark:border-[#496E4B] p-5" : ""}`}
          onClick={() => {setSelectedTask(task)}}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onToggleComplete(task.id)}}
              className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-colors
                ${task.completed 
                  ? 'border-[#3F9142] bg-[#3F9142] text-white' 
                  : 'border-border hover:border-[#3F9142]'
                }`}
            >
              {task.completed && <Check className="h-4 w-4" strokeWidth={2}/>}
            </button>
            <span className={`${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
              {task.title}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {task.dueDate && (
              <span className="text-sm">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            <button
              title="Mark as important"
              aria-label='Mark as important'
              type='button'
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                onToggleImportant(task.id)
              }}
              className={`rounded-full p-1 transition-colors hover:bg-accent`}
            >
              <Star className="h-5 w-5" fill={task.important ? 'currentColor' : 'none'}/>
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default TaskList 