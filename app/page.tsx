import { BotStatus } from '../components/BotStatus'
import { QueryLog } from '../components/QueryLog'
import { BotMetrics } from '../components/BotMetrics'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Nelson Pediatrics Telegram Bot with Mistral AI</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BotStatus />
        <QueryLog />
        <BotMetrics />
      </div>
    </main>
  )
}
