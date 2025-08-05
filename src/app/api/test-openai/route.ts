import { NextRequest, NextResponse } from 'next/server';
import { getChatCompletion } from '@/lib/openai';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing OpenAI API connection...');
    
    // Test with a simple prompt
    const testPrompt = "Say 'Hello, OpenAI API is working!' in one sentence.";
    
    const result = await getChatCompletion([
      {
        role: 'user',
        content: testPrompt
      }
    ], 'gpt-4o-mini');
    
    console.log('OpenAI API test successful:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'OpenAI API is working!',
      response: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('OpenAI API test failed:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 