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
        console.log('Generating recommendation for:', data);
        const { shape, carat, clarity, color, cut } = data;
        result = await getDiamondRecommendation(shape, carat, clarity, color, cut);
        console.log('OpenAI response received successfully');
        break;
      case 'description':
        const { attribute, value } = data;
        result = await getDiamondDescription(attribute, value);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    let errorMessage = 'An error occurred while processing your request.';
    let statusCode = 500;

    if (error.message?.includes('API key')) {
      errorMessage = 'OpenAI API key is invalid or missing. Please check your .env.local file and restart the server.';
      statusCode = 401;
    } else if (error.message?.includes('quota')) {
      errorMessage = 'OpenAI API quota exceeded. Please check your billing details.';
      statusCode = 429;
    } else if (error.message?.includes('model')) {
      errorMessage = 'OpenAI model access error. Please try again later.';
      statusCode = 403;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
} 