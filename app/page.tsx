import { Bot } from 'lucide-react'
import { ChatInterface } from '@/components/chat-interface'
import { ThemeToggle } from '@/components/theme-toggle'
import { ChatInput } from '@/components/chat-input'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="flex items-center justify-between p-4 max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">NelsonBot</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">
        <ChatInterface />
      </main>
      <ChatInput />
    </div>
  )
}
