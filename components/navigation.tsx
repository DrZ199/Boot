'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle, Calculator } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky bottom-0 w-full border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
      <div className="flex justify-around items-center h-16 max-w-3xl mx-auto">
        <Link
          href="/"
          className={`flex flex-col items-center space-y-1 ${
            pathname === '/' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs">Chat</span>
        </Link>
        <Link
          href="/calculator"
          className={`flex flex-col items-center space-y-1 ${
            pathname === '/calculator' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Calculator className="h-6 w-6" />
          <span className="text-xs">Calculator</span>
        </Link>
      </div>
    </nav>
  )
}