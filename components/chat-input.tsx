'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChat } from 'ai/react'

export function ChatInput() {
  const { input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-2 flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a medical question..."
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
      </form>
    </div>
  )
}
