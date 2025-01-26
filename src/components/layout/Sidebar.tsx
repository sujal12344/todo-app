'use client'

import Link from 'next/link'
import { Calendar, Star, Map, Plus, Info, Clipboard, NotebookPen, InfoIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store/uiStore'
import Image from 'next/image'
// import { useAuthStore } from '@/store/authStore'
import { AiFillInfoCircle } from 'react-icons/ai'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { useTaskStore } from '@/store/taskStore'

const Sidebar = () => {
  const { isSidebarOpen } = useUIStore()
  // const { user } = useAuthStore()
  const { tasks } = useTaskStore()

  interface MenuItem {
    icon: React.ElementType
    label: string
    href: string
  }

  const menuItems: MenuItem[] = [
    { icon: Clipboard, label: 'All Tasks', href: '/' },
    { icon: Calendar, label: 'Today', href: '/today' },
    { icon: Star, label: 'Important', href: '/important' },
    { icon: Map, label: 'Planned', href: '/planned' },
    { icon: NotebookPen , label: 'Assigned to me', href: '/assigned' },
  ]

  const todayTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0]
    return task.dueDate === today
  })

  const completedTodayTasks = todayTasks.filter(task => task.completed)
  const totalTodayTasks = todayTasks.length
  const completionPercentage = totalTodayTasks ? (completedTodayTasks.length / totalTodayTasks) * 100 : 0

  return (
    <AnimatePresence mode="sync">
      {isSidebarOpen && (
        <>
          {/* Backdrop - only show on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => useUIStore.getState().toggleSidebar()}
            className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm lg:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -304 }}
            animate={{ x: 0 }}
            exit={{ x: -304 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-[304px] bg-[#EEF6EF] dark:bg-[#2C2C2C] text-[#000] dark:text-[#fff] z-40 overflow-y-auto"
          >
            <div className="flex h-full flex-col p-4">
              {/* User Profile Section */}
              <div className="flex items-center gap-4 mb-8 px-2">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg" // Add a placeholder image
                    alt="Profile"
                    // fill
                    className="object-cover"
                  />
                </div>
                {/* <h2 className="text-lg font-medium">Hey, {user || 'User'}</h2> */}
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1 bg-[#FBFDFC] dark:bg-[#232323] py-4 px-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="p-2 flex items-center gap-3 hover:text-[#357937] dark:hover:text-[#98E19B] hover:bg-[#357937]/15 rounded-lg transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className='font-[outfit]'>{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Add List Button */}
              <div className="bg-[#FBFDFC] dark:bg-[#232323] p-2 my-2">
                <button className="p-2 flex items-center gap-3 hover:text-[#357937] dark:hover:text-[#98E19B] hover:bg-[#357937]/15 rounded-lg transition-colors w-full">
                  <Plus className="h-7 w-7" />
                  <span className='font-[outfit]'>Add list</span>
                </button>
              </div>

              {/* Stats Section */}
              <div className="bg-[#FBFDFC] dark:bg-[#232323] p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">Today Tasks</h3>
                  <BsFillInfoCircleFill className="h-4 w-4 border-none border-0" fill="#BDBDBD"/>
                </div>
                <div className="text-2xl font-medium">11</div>
                {/* Progress Circle */}
                <div className="relative my-2">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-[#142E15] dark:text-[#A0EDA4] stroke-current"
                      strokeWidth="15"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-[#3F9142] stroke-current"
                      strokeWidth="15"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray="251.2"
                      strokeDashoffset="188.4"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#3F9142] rounded-full flex items-center justify-center"></span>
                    <span className='font-[outfit]'>Pending</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#142E15] dark:bg-[#A0EDA4] rounded-full flex items-center justify-center"></span>
                    <span className='font-[outfit]'>Done</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default Sidebar 