import { GEMINI_MODEL } from '@/lib/constants';
import { buildSystemInstruction, buildContents } from '@/lib/chatUtils';
import { GoogleGenAI } from '@google/genai';
import { NextRequest } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  const systemInstruction = buildSystemInstruction();
  const contents = buildContents(messages);

  const response = await ai.models.generateContentStream({
    model: GEMINI_MODEL.gemini2,
    contents,
    config: {
      systemInstruction,
    },
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const text = chunk.text || '';
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  console.log('stream', stream);

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
