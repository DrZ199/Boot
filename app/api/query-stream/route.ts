import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export async function GET() {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const sendLatestQuery = async () => {
        const { data, error } = await supabase
          .from('query_log')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(1)
          .single()

        if (data) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
        }
      }

      // Send initial query
      await sendLatestQuery()

      // Listen for new inserts
      const subscription = supabase
        .channel('query_log_changes')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'query_log' }, sendLatestQuery)
        .subscribe()

      return () => {
        subscription.unsubscribe()
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
