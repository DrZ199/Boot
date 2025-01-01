import { Telegraf, session } from 'telegraf'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// Use session to store conversation context
bot.use(session())

bot.start((ctx) => {
  ctx.session = { conversationHistory: [] }
  return ctx.reply('Welcome to the Nelson Textbook of Pediatrics bot! How can I help you today?')
})

bot.on('text', async (ctx) => {
  const query = ctx.message.text
  const startTime = Date.now()

  try {
    const response = await processQuery(query, ctx.session.conversationHistory)
    ctx.reply(response)
    
    // Update conversation history
    ctx.session.conversationHistory.push({ role: 'user', content: query })
    ctx.session.conversationHistory.push({ role: 'assistant', content: response })
    
    // Keep only the last 5 messages in the conversation history
    ctx.session.conversationHistory = ctx.session.conversationHistory.slice(-5)
    
    // Log the query
    const endTime = Date.now()
    const responseTime = (endTime - startTime) / 1000 // Convert to seconds
    await supabase
      .from('query_log')
      .insert({ text: query, timestamp: new Date().toISOString(), response_time: responseTime })
  } catch (error) {
    console.error('Error processing query:', error)
    ctx.reply("I'm sorry, but I encountered an error while processing your query. Please try again later.")
  }
})

async function processQuery(query, conversationHistory) {
  // Search Supabase for relevant information
  const { data, error } = await supabase
    .from('nelson_pediatrics')
    .select('content')
    .textSearch('content', query)
    .limit(3)

  if (error) throw error

  let context = ''
  if (data && data.length > 0) {
    context = data.map(item => item.content).join('\n\n')
  }

  // Prepare messages for Mistral AI
  const messages = [
    { role: "system", content: "You are an AI assistant specializing in pediatrics, using information from the Nelson Textbook of Pediatrics. Provide concise, accurate answers based on the given context and conversation history." },
    ...conversationHistory,
    { role: "user", content: `Context: ${context}\n\nQuestion: ${query}` }
  ]

  // Use Mistral AI to generate a response based on the context, conversation history, and query
  const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
    },
    body: JSON.stringify({
      model: "mistral-tiny",
      messages: messages
    })
  })

  const mistralData = await mistralResponse.json()
  
  if (mistralData.choices && mistralData.choices.length > 0) {
    return mistralData.choices[0].message.content
  } else {
    return "I'm sorry, but I couldn't find any relevant information to answer your question. Could you please rephrase or ask something else?"
  }
}

bot.launch()

console.log('Bot is running...')
