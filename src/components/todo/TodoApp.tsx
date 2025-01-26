'use client'

import { useState } from 'react'
import { ChevronDown, ChevronDownIcon, Delete, Plus, Triangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AddTask from './AddTask'
import TaskList from './TaskList'
import { useTaskStore } from '@/store/taskStore'
import { usePathname } from 'next/navigation'
import TaskEditor from './TaskEditor'
import { Bell, RotateCcw, Calendar, X } from 'lucide-react'
import { Task } from '@/types/task'

const TodoApp = () => {
  const { selectedTask, setSelectedTask } = useTaskStore()
  const pathname = usePathname()
  
  const {
    tasks,
    addTask,
    toggleTaskComplete,
    toggleTaskImportant,
    getTodayTasks,
    getImportantTasks,
    getPlannedTasks,
    getAssignedTasks,
  } = useTaskStore()

  // Get tasks based on current route
  const getCurrentTasks = () => {
    switch (pathname) {
      case '/today':
        return getTodayTasks()
      case '/important':
        return getImportantTasks()
      case '/planned':
        return getPlannedTasks()
      case '/assigned':
        return getAssignedTasks()
      default:
        return tasks
    }
  }

  // Get page title based on current route
  const getPageTitle = () => {
    switch (pathname) {
      case '/today':
        return 'Today\'s Tasks'
      case '/important':
        return 'Important Tasks'
      case '/planned':
        return 'Planned Tasks'
      case '/assigned':
        return 'Assigned Tasks'
      default:
        return 'All Tasks'
    }
  }

  return (
    <div className="relative">
      <motion.main
        initial={false}
        animate={{
          paddingRight: selectedTask ? "18rem" : "1rem",
          transition: { duration: 0.4, type: "spring", bounce: 0 }
        }}
        // className="pt-16"
        className="space-y-4"
      >
        {/* TODO title */}
        <div className="flex items-center gap-2">
          {/* <h1 className="text-2xl font-bold text-foreground">{getPageTitle()}</h1> */}
          <h1 className="text-primary font-medium font-[Outfit] text-lg">To Do</h1>
          <Triangle className="h-3 w-3 cursor-pointer text-primary rotate-180" fill='currentColor'/>
        </div>

        {/* Gradient section */}
        <div className="relative hidden">
          {/* Input with gradient background */}
          <div className="relative">
            <input
              type="text"
              placeholder="Add a task..."
              className="text-foreground placeholder:text-muted-foreground border-none rounded-lg py-3 px-4"
            />
            {/* Dark mode gradient */}
            <div 
              className="absolute inset-0 rounded-lg dark:bg-gradient-to-b dark:from-[#232323]/50 dark:to-[#232323]/25 -z-10"
              aria-hidden="true"
            />
          </div>

          {/* No tasks message */}
          <div className="mt-4 text-center text-muted-foreground text-sm">
            No tasks yet. Add one above!
          </div>
        </div>

        <AddTask2 onAdd={addTask} onClose={() => setSelectedTask(null)}/>

        <div className="text-back dark:text-white font-[Outfit] text-lg">In Progress</div>
        <div className="bg-card">
          <TaskList 
            tasks={getCurrentTasks().filter((task) => !task.completed).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
            onToggleComplete={toggleTaskComplete}
            onToggleImportant={toggleTaskImportant}
          />
        </div>
        <div className="text-back dark:text-white font-[Outfit] text-lg">Completed</div>
        <div className="bg-card">
          <TaskList 
            tasks={getCurrentTasks().filter((task) => task.completed).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
            onToggleComplete={toggleTaskComplete}
            onToggleImportant={toggleTaskImportant}
          />
        </div>
      </motion.main>
      
      {selectedTask &&<TaskEditor task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </div>
  )
}

export default TodoApp

interface AddTaskProps {
  onAdd: (task: Task) => void
  onClose: () => void
}

const AddTask2 = ({ onAdd, onClose }: AddTaskProps) => {
  const [title, setTitle] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showReminder, setShowReminder] = useState(false)
  const [dueDate, setDueDate] = useState('')
  const [reminder, setReminder] = useState('')
  const { deleteAllTasks } = useTaskStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      important: false,
      dueDate: dueDate || null,
      reminder: reminder || null,
      createdAt: new Date().toISOString(),
    }

    onAdd(newTask)
    resetForm()
  }

  const resetForm = () => {
    setTitle('')
    setDueDate('')
    setReminder('')
    setShowDatePicker(false)
    setShowReminder(false)
  }

  return (
    <div className="flex flex-col h-full bg-[#357937]/20 dark:bg-[#2F3630] border-t-2 border-x-0 border-b-0 border-t-[#496E4B]/20">

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        {/* Task Input */}
        <div className="p-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task..."
            className="w-full bg-transparent text-lg focus:outline-none placeholder:text-muted-foreground"
            autoFocus
          />
        </div>

        
        {/* Quick Actions */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center justify-center gap-6">
          <button 
            onClick={() => setShowReminder(!showReminder)}
            className={`transition-colors ${showReminder ? 'text-[#3F9142] dark:text-[#98E19B]' : 'hover:text-[#3F9142] dark:hover:text-[#98E19B]'}`}
            aria-label="Set reminder"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={`transition-colors ${showDatePicker ? 'text-[#3F9142] dark:text-[#98E19B]' : 'hover:text-[#3F9142] dark:hover:text-[#98E19B]'}`}
            aria-label="Set due date"
          >
            <Calendar className="h-5 w-5" />
          </button>
          <button 
            onClick={resetForm}
            className="hover:text-[#3F9142] dark:hover:text-[#98E19B] transition-colors"
            aria-label="Reset form"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          </div>
          <button 
            type="submit"
            disabled={!title.trim()}
            onClick={onClose}
            className="inline-flex items-center justify-center gap-4 rounded-md bg-[#357937]/85 hover:bg-[#357937] dark:bg-[#3F9142] dark:hover:bg-[#357937] px-4 py-1.5 text-sm font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-lg font-medium font-[Outfit]">Add Task</span>
          </button>
        </div>

        {/* Date/Time Pickers */}
        <AnimatePresence mode='sync'>
          {(showDatePicker || showReminder) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-4 border-t border-border/30">
                {showDatePicker && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <input
                      type="date"
                      title='due date'
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="bg-transparent border border-input rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[#3F9142] dark:focus:ring-[#98E19B]"
                    />
                  </div>
                )}
                {showReminder && (
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <input
                      type="datetime-local"
                      title='reminder'
                      value={reminder}
                      onChange={(e) => setReminder(e.target.value)}
                      className="bg-transparent border border-input rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-[#3F9142] dark:focus:ring-[#98E19B]"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}