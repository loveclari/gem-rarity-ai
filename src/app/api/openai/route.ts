import { NextRequest, NextResponse } from 'next/server';
import { getDiamondRecommendation, getDiamondDescription } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    console.log('Processing OpenAI request:', { action, data });

    let result;

    switch (action) {
      case 'recommendation':
        const { shape, carat, clarity, color, cut } = data;
        console.log('Generating recommendation for:', { shape, carat, clarity, color, cut });
        result = await getDiamondRecommendation(shape, carat, clarity, color, cut);
        break;

      case 'description':
        const { attribute, value } = data;
        console.log('Generating description for:', { attribute, value });
        result = await getDiamondDescription(attribute, value);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }

    console.log('OpenAI response received successfully');
    return NextResponse.json({ result });
  } catch (error) {
    console.error('OpenAI API Error:', error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('not initialized')) {
        return NextResponse.json(
          { error: 'OpenAI API key is invalid or missing. Please check your .env.local file and restart the server.' },
          { status: 500 }
        );
      }
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'OpenAI rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
} 