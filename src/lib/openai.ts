import OpenAI from 'openai';

// Initialize OpenAI client with error handling
let openai: OpenAI | null = null;

try {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (apiKey) {
    openai = new OpenAI({
      apiKey: apiKey,
    });
  }
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error);
}

// Helper function for chat completions
export async function getChatCompletion(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  model: string = 'gpt-4o-mini'
) {
  if (!openai) {
    throw new Error('OpenAI client not initialized. Please check your API key configuration.');
  }

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

// Helper function for generating diamond recommendations
export async function getDiamondRecommendation(
  shape: string,
  carat: string,
  clarity: string,
  color: string,
  cut: string
) {
  const prompt = `Given a diamond with the following specifications:
- Shape: ${shape}
- Carat Weight: ${carat}
- Clarity: ${clarity}
- Color: ${color}
- Cut: ${cut}

Please provide a brief analysis of this diamond's characteristics and rarity. Include:
1. Overall quality assessment
2. Rarity factors
3. Potential value considerations
4. Any notable features

Keep the response concise and informative.`;

  return await getChatCompletion([
    {
      role: 'system',
      content: 'You are a diamond expert with deep knowledge of gemology and diamond valuation. Provide accurate, helpful analysis of diamond specifications.'
    },
    {
      role: 'user',
      content: prompt
    }
  ]);
}

// Helper function for generating descriptions
export async function getDiamondDescription(attribute: string, value: string) {
  const prompt = `Explain the diamond ${attribute} "${value}" in simple terms. Include:
1. What it means
2. How it affects the diamond's appearance
3. Its impact on value
4. Where it falls on the quality scale

Keep it educational but easy to understand.`;

  return await getChatCompletion([
    {
      role: 'system',
      content: 'You are a gemologist explaining diamond characteristics to customers. Use clear, educational language.'
    },
    {
      role: 'user',
      content: prompt
    }
  ]);
} 