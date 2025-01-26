'use client'

import { useState } from 'react'
import { X, Calendar, Bell, Star } from 'lucide-react'
import { Task } from '@/types/task'
// import { motion } from 'framer-motion'

interface AddTaskProps {
  onAdd: (task: Task) => void
  onClose: () => void
}

const AddTask = ({ onAdd, onClose }: AddTaskProps) => {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [reminder, setReminder] = useState('')
  const [important, setImportant] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      important,
      dueDate: dueDate || null,
      reminder: reminder || null,
      createdAt: new Date().toISOString(),
    }

    onAdd(newTask)
    setTitle('')
    setDueDate('')
    setReminder('')
    setImportant(false)
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Add Task</h2>
        <button
          type='button'
          title='close'
          onClick={onClose}
          className="rounded-full p-2 hover:bg-accent transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task name"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <input
              type="date"
              title='due date'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <input
              type="datetime-local"
              title='reminder'
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <button
            type="button"
            onClick={() => setImportant(!important)}
            className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors
              ${important 
                ? 'bg-yellow-500/20 text-yellow-500' 
                : 'hover:bg-accent'
              }`}
          >
            <Star className="h-5 w-5" />
            <span>Mark as important</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
          <button
            type="submit"
            className="w-full rounded-md bg-[#3F9142] hover:bg-[#357937] px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTask 