'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Metrics {
  totalQueries: number
  averageResponseTime: number
}

export function BotMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({ totalQueries: 0, averageResponseTime: 0 })

  useEffect(() => {
    const eventSource = new EventSource('/api/metrics-stream')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setMetrics(data)
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bot Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Total Queries: {metrics.totalQueries}</p>
        <p>Average Response Time: {metrics.averageResponseTime.toFixed(2)}s</p>
      </CardContent>
    </Card>
  )
}
