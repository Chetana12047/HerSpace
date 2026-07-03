import type { MoodId } from "./data"
import OpenAI from "openai"

const apiKey = import.meta.env.VITE_GROQ_API_KEY

export const isGeminiConfigured = !!apiKey

const groq = new OpenAI({
  apiKey,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
})

// ——————————————————
// HELPERS
// ——————————————————

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      resolve(reader.result as string)
    }

    reader.onerror = (error) => {
      reject(error)
    }
  })
}

// ——————————————————
// SPEECH IMPROVER
// ——————————————————

export async function improveSpeechText(text: string) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You improve speech-to-text transcripts.

Rules:
- Add proper punctuation
- Add commas and question marks naturally
- Preserve emotional tone
- Fix capitalization
- Keep original meaning
- Do NOT rewrite heavily
- Return ONLY corrected text
`,
        },

        {
          role: "user",
          content: text,
        },
      ],

      temperature: 0.3,
      max_tokens: 120,
    })

    return completion.choices[0]?.message?.content || text

  } catch {
    return text
  }
}

// ——————————————————
// CHAT COMPANION
// ——————————————————

async function askHerSpaceAI(prompt: string) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: `
You are Luna, a warm emotional wellness companion inside HerSpace.

IMPORTANT:
- Speak naturally like a caring human companion
- Be emotionally warm and calm
- Never sound robotic
- Never mention being AI
- Keep responses conversational
- Avoid overly long paragraphs
- Be supportive and emotionally intelligent
- Talk softly and naturally
        `,
      },

      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.9,
    max_tokens: 300,
  })

  return (
    completion.choices[0]?.message?.content ||
    "I'm here with you 🌸"
  )
}

export async function generateChatReply(
  message: string,
): Promise<string> {

  await delay(400)

  if (!apiKey) {
    return "Groq API key is missing 🌸"
  }

  try {

    const prompt = `
You are "Luna", the emotional wellness companion inside a calming wellness app called HerSpace.

Your role:
You are NOT an AI assistant.
You are a warm, emotionally intelligent companion who talks naturally and gently like a supportive trusted friend.

Your personality:
- emotionally warm
- soft
- comforting
- calm
- feminine and safe
- emotionally aware
- supportive but realistic
- never robotic
- never overly formal

IMPORTANT BEHAVIOR RULES:
- Never say you are an AI language model
- Never sound like customer support
- Never give robotic motivational speeches
- Never repeat generic lines
- Never diagnose mental health conditions
- Never give medical advice
- Never shame or judge the user
- Avoid long paragraphs
- Talk naturally like real conversation
- Keep responses emotionally human

User message:
"${message}"

Now respond naturally as Luna from HerSpace.
`

    const response = await askHerSpaceAI(prompt)

    return response
      .replace(/\*/g, "")
      .replace(/#/g, "")
      .trim()

  } catch (error) {

    console.error("HERSPACE AI ERROR:", error)

    return "Something feels a little disconnected right now 🌸 Please try again in a moment."
  }
}

// ——————————————————
// RECIPE GENERATOR
// ——————————————————

export interface GeneratedRecipe {
  title: string
  time: string
  difficulty: string

  ingredients: string[]
  optionalIngredients: string[]

  steps: string[]

  calories: number
  protein: number
  carbs: number
  fats: number
  fiber: number

  wellness: string
}

export async function generateRecipes(
  ingredientsInput: string,
): Promise<GeneratedRecipe[]> {

  await delay(700)

  if (!apiKey) {
    return []
  }

  try {

    const prompt = `
You are a smart recipe assistant inside a wellness app called HerSpace.

The user may:
- provide ingredients
- provide incomplete ingredients
- ask casually for healthy food
- type random text

YOUR JOB:
- understand intent intelligently
- create ONLY realistic recipes
- NEVER hallucinate impossible dishes

RULES:

1. If user gives ingredients:
- create recipes mainly using them

2. You MAY additionally use common household ingredients such as:
- salt
- turmeric
- chili
- coriander
- oil
- butter
- sugar
- pepper
- cumin
- garlic
- ginger

3. Optional ingredients should go in:
"optionalIngredients"

4. If recipe truly cannot be made:
return empty array []

5. If user gives vague prompt like:
"make something healthy"
or
"easy breakfast"

then create SIMPLE realistic healthy recipes using common household ingredients.

6. Recipes must:
- be beginner friendly
- realistic
- emotionally comforting
- healthy where possible
- practical for Indian households
- not fancy restaurant food

7. Estimate approximate:
- calories
- protein
- carbs
- fats
- fiber

8. Add short wellness insight.

RETURN ONLY VALID JSON ARRAY.

FORMAT:

[
  {
    "title": "",
    "time": "",
    "difficulty": "",

    "ingredients": [],
    "optionalIngredients": [],

    "steps": [],

    "calories": 0,
    "protein": 0,
    "carbs": 0,
    "fats": 0,
    "fiber": 0,

    "wellness": ""
  }
]

USER INPUT:
${ingredientsInput}
`

    const completion =
      await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content:
              "You are a smart realistic wellness recipe assistant.",
          },

          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.5,
        max_tokens: 1200,
      })

    const text =
      completion.choices[0]?.message?.content || "[]"

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    return JSON.parse(cleaned)

  } catch (error) {

    console.error("RECIPE ERROR:", error)

    return []
  }
}

// ——————————————————
// FOOD SCANNER
// ——————————————————

export interface NutritionEstimate {
  label: string
  calories: number
  protein: number
  carbs: number
  fats: number
  fiber: number
  vitamins: string[]
  wellness: string
}

export async function analyzeFoodImage(
  file: File,
): Promise<NutritionEstimate> {

  const base64 = await fileToBase64(file)

  const completion = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",

    messages: [
      {
        role: "system",
        content: `
You are an expert nutrition analyst for a wellness app called HerSpace.

Analyze the food image carefully.

Rules:
- Identify the food dish correctly
- Estimate realistic nutrition values
- Estimate based on visible quantity
- Be practical and believable
- Give approximate but intelligent nutrition values
- Focus especially on women's wellness
- Mention if the food is balanced, heavy, sugary, oily, protein-rich etc.

Pay special attention to Indian dishes and street foods.

IMPORTANT VALIDATION RULES:

- First determine whether the image actually contains edible food or beverages.
- If not food, return:
{
  "label": "Not a food item",
  "calories": 0,
  "protein": 0,
  "carbs": 0,
  "fats": 0,
  "fiber": 0,
  "vitamins": [],
  "wellness": "This image does not appear to contain edible food or beverages."
}

Return ONLY valid JSON.

FORMAT:
{
  "label": "",
  "calories": 0,
  "protein": 0,
  "carbs": 0,
  "fats": 0,
  "fiber": 0,
  "vitamins": [],
  "wellness": ""
}
`,
      },

      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this food image",
          },

          {
            type: "image_url",
            image_url: {
              url: base64,
            },
          },
        ],
      },
    ],

    temperature: 0.4,
    max_tokens: 500,
  })

  const text =
    completion.choices[0]?.message?.content || "{}"

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  return JSON.parse(cleaned)
}

// ——————————————————
// MOOD SUPPORT
// ——————————————————

export function getMoodPromptHint(
  mood: MoodId | null,
): string {

  if (!mood) return ""

  return `User mood is ${mood}. Keep tone emotionally warm and supportive.`
}