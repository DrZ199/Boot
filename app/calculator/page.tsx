import { Calculator } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { DrugCalculator } from '@/components/drug-calculator'

export default function CalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="flex items-center justify-between p-4 max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">Drug Calculator</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto pb-16">
        <DrugCalculator />
      </main>
    </div>
  )
}
