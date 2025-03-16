import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
});

export async function getChatbotResponse(message: string) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful travel assistant that helps students book train tickets and plan their journeys." },
        { role: "user", content: message }
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    throw error;
  }
} 