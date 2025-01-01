'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Query {
  id: number
  text: string
  timestamp: string
}

export function QueryLog() {
  const [queries, setQueries] = useState<Query[]>([])

  useEffect(() => {
    const eventSource = new EventSource('/api/query-stream')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setQueries(prevQueries => [data, ...prevQueries].slice(0, 10))
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Queries</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {queries.map((query) => (
            <li key={query.id} className="text-sm">
              <span className="font-semibold">{new Date(query.timestamp).toLocaleString()}: </span>
              {query.text}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
