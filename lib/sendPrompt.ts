'use server';

import { GoogleGenAI } from '@google/genai';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export const sendPrompt = async (prompt: string) => {
  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction:
        'You are a helpful assistant that helps answer questions and solve problems. Do not yapping. Answer the question directly and concisely. If you do not know the answer, say you do not know. Make the response by markdown format. If the question is about code, please provide the code block in markdown format. But do not provide code block if the question is not about code. Do not provide any style like bold or italic. Just provide the answer directly.',
    },
  });

  for await (const chunk of response) {
    console.log('response AI Gemini', chunk.text);
    return chunk.text;
  }
};
