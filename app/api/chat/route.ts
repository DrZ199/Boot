import { HfInference } from '@huggingface/inference'
import { HuggingFaceStream, StreamingTextResponse } from 'ai'

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const response = Hf.textGenerationStream({
    model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
    inputs: messages.map((m: any) => m.content).join('\n'),
    parameters: {
      max_new_tokens: 200,
      temperature: 0.7,
      top_p: 0.95,
      repetition_penalty: 1.2,
    },
  })

  const stream = HuggingFaceStream(response)
  return new StreamingTextResponse(stream)
}

