import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export async function GET() {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const sendMetrics = async () => {
        const { data: totalQueries } = await supabase
          .from('query_log')
          .select('count', { count: 'exact' })

        const { data: avgResponseTime } = await supabase
          .from('query_log')
          .select('response_time')
          .avg('response_time')

        const metrics = {
          totalQueries: totalQueries?.count || 0,
          averageResponseTime: avgResponseTime?.[0]?.avg || 0
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(metrics)}\n\n`))
      }

      // Send initial metrics
      await sendMetrics()

      // Update metrics every 5 seconds
      const interval = setInterval(sendMetrics, 5000)

      return () => {
        clearInterval(interval)
      }
    }
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}
