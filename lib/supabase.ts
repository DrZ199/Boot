import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export async function searchPediatricContent(query: string) {
  const { data, error } = await supabase
    .from('nelson_pediatrics')
    .select('content')
    .textSearch('content', query)
    .limit(3)

  if (error) throw error
  return data
}

export async function logQuery(query: string, responseTime: number) {
  const { error } = await supabase
    .from('query_log')
    .insert({ text: query, timestamp: new Date().toISOString(), response_time: responseTime })

  if (error) throw error
}

export async function getMetrics() {
  const { data: totalQueries } = await supabase
    .from('query_log')
    .select('count', { count: 'exact' })

  const { data: avgResponseTime } = await supabase
    .from('query_log')
    .select('response_time')
    .avg('response_time')

  return {
    totalQueries: totalQueries?.count || 0,
    averageResponseTime: avgResponseTime?.[0]?.avg || 0
  }
}
