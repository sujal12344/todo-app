"use client"

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useUIStore } from '@/store/uiStore'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { isSidebarOpen } = useUIStore()

  return (
    <div className="bg-background">
      <Navbar />
      <Sidebar />
      <motion.main
        initial={false}
        animate={{
          paddingLeft: isSidebarOpen ? "19rem" : "1rem",
          transition: { duration: 0.4, type: "spring", bounce: 0 }
        }}
        className="pt-16"
      >
        <div className="p-4">
          {children}
        </div>
      </motion.main>
    </div>
  )
}

export default Layout
