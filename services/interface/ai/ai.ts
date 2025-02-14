import {
  GoogleGenerativeAI,
} from '@google/generative-ai'
import type { GenerativeModel } from '@google/generative-ai'

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey as string)

export async function ai(): Promise<GenerativeModel> {
  return genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
  })
}
