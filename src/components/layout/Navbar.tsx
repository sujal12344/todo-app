'use client'

import { useTheme } from 'next-themes'
import { LayoutGrid, List, Menu, MenuIcon, Moon, MoonStar, Search, Sun } from 'lucide-react'
import Image from 'next/image'
// import { useAuthStore } from '@/store/authStore'
import { sen } from '@/app/layout'
import { useUIStore } from '@/store/uiStore'
import { useRouter } from 'next/navigation'
// import { currentUser } from '@clerk/nextjs/server'
import { SignInButton, useAuth, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  // const { user, logout } = useAuthStore()
  const { toggleSidebar, toggleLayoutGrid, isLayoutGrid } = useUIStore()
  const router = useRouter()

  const { isSignedIn } = useAuth()

  return (
    <nav className="fixed top-0 z-50 w-full">
      <div className="flex items-center justify-between h-16 px-8">
        <div className="flex items-center gap-4">
          <Menu className="h-7 w-7 cursor-pointer" onClick={toggleSidebar}/>
          <div className="flex items-center justify-center gap-1 cursor-pointer" onClick={() => router.push('/')}>
          <Image
            src="/logo.svg"
            alt="DoIt Logo"
            width={30}
            height={30}
            className="animate-fade-in"
          />
          <h1 className={`${sen.className} font-semibold text-[#3F9142] text-2xl select-none`}>DoIt</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {/* {user && (
            <span className="text-sm text-muted-foreground">
              Welcome, {user}
            </span>
          )} */}
          
          <button
            type='button'
            title='search'
            // onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-md hover:bg-accent transition-colors duration-200 flex items-center justify-center"
            aria-label="search"
          >
            <Search className="h-5 w-5 transition-all" />
          </button>

          <button
            type='button'
            title='list-grid'
            onClick={toggleLayoutGrid}
            className="rounded-md p-2 hover:bg-accent transition-colors duration-200 flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {isLayoutGrid ? <LayoutGrid className="h-5 w-5 transition-all" />: <List className="h-5 w-5 transition-all"/>}
    
          </button>

          <button
            title='toggle-theme'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-md p-2 hover:bg-accent transition-colors duration-200 flex items-center justify-center"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonStar className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          {isSignedIn ? 
          <div className="flex items-center justify-center pl-4">
            <UserButton afterSignOutUrl="/sign-in" afterSwitchSessionUrl='/sign-in' signInUrl='/sign-in' />
          </div> : 
          <SignInButton /> }

          {/* {user && (
            <button
              onClick={logout}
              className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors duration-200"
            >
              Logout
            </button>
          )} */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 