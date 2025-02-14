import axios from 'axios'
import auth from '@/services/interface/auth/auth'
import storage from '@/services/interface/storage/storage'
import { ai } from './ai'

export async function generate(
  { key, type }:
  { key: string, type: string },
): Promise<{
    result: string | null
    error: Error | null
  }> {
  const { result: user } = await auth.user()
  if (!user) {
    return { result: null, error: new Error('User not found') }
  }

  const { result: url, error } = await storage.read({ key })
  if (!url && error) {
    return { result: null, error: new Error('Image not found') }
  }
  const buffer = await axios.get((url as string), { responseType: 'arraybuffer' })
  const image = Buffer.from(buffer.data).toString('base64')

  const model = await ai()

  const { response } = await model.generateContent({
    generationConfig: {
      topP: 0.95,
      topK: 40,
      temperature: 0,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
    },
    contents: [{
      role: 'user',
      parts: [{
        inlineData: {
          data: image,
          mimeType: type,
        },
      }, {
        text: 'Analyse the following image',
      }],
    }],
    systemInstruction: `
      You are an expert food analyst, tasked with extracting detailed information from images of dishes. Your primary goal is to generate a JSON output containing a comprehensive analysis of the dish, including its category, description, health assessment, nutrient breakdown, and potential recipe. 
      You must always return a single, valid, and parseable JSON object. The JSON object should conform to the specified format. All values, except for scalars (numbers, booleans, null), must be double-quoted as valid strings. Avoid including any comments within the JSON structure. 
      In cases where the user requests multiple JSON responses, always return a single parseable JSON array, where each element of the array is a JSON object conforming to the described format. Do not include any extra text outside of the JSON string. 
      The JSON object should contain the following keys:

      1.  \`category\`: (string) the cuisine or type of food, e.g., "Indonesian", "Italian", "Dessert", etc.
      2.  \`description\`: (string) a brief description of the dish.
      3.  \`health\`: (object) an object containing a health assessment of the dish:
          *   \`improvements\`: (string) suggestions for making the dish healthier.
          *   \`negatives\`: (string) potential negative health aspects of the dish.
          *   \`positives\`: (string) positive health aspects of the dish.
          *   \`rating\`: (float) a health rating score between 0 and 10.
          *   \`reasoning\`: (string) explanation of the health rating.
      4. \`name\`: (string) the name of the dish.
      5. \`nutrients\`: (object) an object containing a breakdown of the dish's nutrients:
          *   \`calories\`: (int) estimated calorie count.
          *   \`carbohydrates\`: (int) estimated carbohydrate content in grams.
          *   \`cholesterol\`: (int) estimated cholesterol content in milligrams.
          *   \`fat\`: (int) estimated total fat content in grams.
          *   \`fiber\`: (int) estimated fiber content in grams.
          *   \`protein\`: (int) estimated protein content in grams.
          *   \`saturatedFat\`: (int) estimated saturated fat content in grams.
          *   \`sodium\`: (int) estimated sodium content in milligrams.
          *   \`sugar\`: (int) estimated sugar content in grams.
          *   \`others\`: (array) an array of objects, each containing details for other nutrients not mentioned above. Each object should contain 
              * \`name\` (string)
              * \`metric\` (string)
              * \`description\` (string)
              * \`value\` (int)
      6. \`recipe\`: (object) an object containing the recipe:
          * \`ingredients\`: (array) a list of the ingredients (strings)
          * \`steps\`: (array) a list of recipe steps (strings)

      Estimate nutrient values and ingredients based on the image provided, and if possible suggest a recipe. Be detailed in your assessments and provide clear explanations within the JSON.

      Invalid Image: if the input is not a clear image of a dish you should response with a common error object
    `,
  })

  const result = response.text()
  if (!result) {
    return { result: null, error: new Error('Cannot analyze image') }
  }

  return { result, error: null }
}
