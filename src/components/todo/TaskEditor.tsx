'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Calendar, Plus, X, Trash2, RotateCcw, Check, NotebookPen } from 'lucide-react'
import { Task } from '@/types/task'
import { useTaskStore } from '@/store/taskStore'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

interface TaskEditorProps {
  task: Task
  onClose: () => void
}

const TaskEditor = ({ task, onClose }: TaskEditorProps) => {
  const { updateTask, deleteTask, duplicateTask } = useTaskStore()
  const [title, setTitle] = useState(task.title)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showReminder, setShowReminder] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [dueDate, setDueDate] = useState(task.dueDate ? new Date(task.dueDate) : null)
  const [reminder] = useState(task.reminder || '')
  const [notes, setNotes] = useState(task.notes || '')
  const [steps, setSteps] = useState(task.steps || [])
  const [newStep, setNewStep] = useState('')
  // const { selectedTask, setSelectedTask } = useTaskStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const updatedTask: Task = {
      ...task,
      title: title.trim(),
      dueDate: dueDate?.toISOString() || null,
      reminder: reminder || null,
      notes: notes || null,
      steps: steps,
    }

    updateTask(updatedTask)
    onClose()
  }

  const handleAddStep = () => {
    if (!newStep.trim()) return
    setSteps([...steps, { id: Date.now().toString(), text: newStep.trim(), completed: false }])
    setNewStep('')
  }

  const toggleStepComplete = (stepId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ))
  }

  const handleDuplicate = () => {
    duplicateTask(task.id)
    onClose()
  }

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ x: 304 }}
          animate={{ x: 0 }}
          exit={{ x: 304 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed right-0 top-16 z-40 min-h-[calc(100vh-4rem)] w-[380px] max-w-md bg-white dark:bg-[#1E1E1E] p-6"
        >
          <form onSubmit={handleSubmit} className="flex flex-col h-full gap-4">
            {/* Header with Complete Toggle */}
            <div className="flex items-center gap-4">
              <button
                title='complete'
                type="button"
                onClick={() => {updateTask({ ...task, completed: !task.completed })}}
                className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors
                  ${task.completed 
                    ? 'bg-[#3F9142] border-[#3F9142] text-white' 
                    : 'border-muted-foreground hover:border-[#3F9142]'
                  }`}
              >
                {task?.completed ? <Check className="h-4 w-4" /> : null}
              </button>
              <input
                title='title'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 bg-transparent text-lg focus:outline-none"
                placeholder="Task name"
              />
              <button
                title='close'
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-accent/50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Steps Section */}
            <div className="space-y-2">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center gap-2">
                  <button
                    title='complete'
                    type="button"
                    onClick={() => toggleStepComplete(step.id)}
                    className={`h-5 w-5 rounded border flex items-center justify-center transition-colors
                      ${step.completed 
                        ? 'bg-[#3F9142] border-[#3F9142] text-white' 
                        : 'border-muted-foreground hover:border-[#3F9142]'
                      }`}
                  >
                    {step.completed && <Check className="h-3 w-3" />}
                  </button>
                  <span className={step.completed ? 'line-through text-muted-foreground' : ''}>
                    {step.text}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-muted-foreground" />
                <input
                  title='new step'
                  type="text"
                  value={newStep}
                  onChange={(e) => setNewStep(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddStep()}
                  placeholder="Add step"
                  className="flex-1 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 border-t border-border pt-4">
              <button
                title='reminder'
                type="button"
                onClick={() => setShowReminder(!showReminder)}
                className="w-full p-3 flex items-center gap-3 hover:bg-accent/50 rounded-lg"
              >
                <Bell className="h-5 w-5" />
                <span>Set Reminder</span>
              </button>

              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full p-3 flex items-center gap-3 hover:bg-accent/50 rounded-lg"
              >
                <Calendar className="h-5 w-5" />
                <span>Add Due Date</span>
                {dueDate && (
                  <span className="ml-auto text-sm text-muted-foreground">
                    {dueDate.toLocaleDateString()}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={handleDuplicate}
                className="w-full p-3 flex items-center gap-3 hover:bg-accent/50 rounded-lg"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Repeat</span>
              </button>

              <button
                type="button"
                onClick={() => setShowNotes(!showNotes)}
                className="w-full p-3 flex items-center gap-3 hover:bg-accent/50 rounded-lg"
              >
                <NotebookPen className="h-5 w-5" />
                <span>Add Notes</span>
              </button>
            </div>

            {/* Date Picker */}
            <AnimatePresence>
              {showDatePicker && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <DatePicker
                    selected={dueDate}
                    onChange={(date: Date | null) => setDueDate(date)}
                    inline
                    calendarClassName="bg-white dark:bg-[#232323] border dark:border-gray-700 rounded-lg"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notes Section */}
            <AnimatePresence>
              {showNotes && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your notes here..."
                    className="w-full h-32 bg-transparent border rounded-lg p-3 focus:outline-none resize-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Actions */}
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
              <button
                title='delete'
                type="button"
                onClick={() => {deleteTask(task.id); onClose()}}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-full"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="bg-[#3F9142] text-white px-4 py-2 rounded-md hover:bg-[#357937] disabled:opacity-50"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </>
    </AnimatePresence>
  )
}

export default TaskEditor 