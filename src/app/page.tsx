'use client';
 
import TodoApp from '@/components/todo/TodoApp';
import { useAuth } from '@clerk/nextjs';
import { useRouter, redirect } from 'next/navigation'
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter()

  const { isSignedIn } = useAuth()
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in')
    }
  }, [isSignedIn, router])
  return (
    <main>
      {isSignedIn ? <TodoApp /> : redirect("/sign-in")}
    </main>
  );
}
