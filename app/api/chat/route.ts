import { GEMINI_MODEL_FALLBACK_ORDER } from '@/lib/constants';
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

  let lastError: unknown = null;

  // Coba setiap model secara berurutan sampai berhasil
  for (const model of GEMINI_MODEL_FALLBACK_ORDER) {
    try {
      const response = await ai.models.generateContentStream({
        model,
        contents,
        config: {
          systemInstruction,
        },
      });

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of response) {
              const text = chunk.text || '';
              controller.enqueue(encoder.encode(text));
            }
            controller.close();
          } catch (streamError) {
            // Jika error terjadi saat streaming (mid-stream),
            // kita tidak bisa fallback karena sebagian response sudah dikirim.
            console.error(`Stream error with model ${model}:`, streamError);
            controller.error(streamError);
          }
        },
      });

      console.log(`Using model: ${model}`);

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
        },
      });
    } catch (error) {
      lastError = error;
      console.warn(
        `Model ${model} failed, trying next model...`,
        error instanceof Error ? error.message : error,
      );
      // Lanjut ke model berikutnya
      continue;
    }
  }

  // Semua model gagal
  console.error('All models failed. Last error:', lastError);
  return new Response(
    JSON.stringify({
      error: 'Semua model gagal. Silakan coba lagi nanti.',
    }),
    {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
