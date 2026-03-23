'use client';

import { Button, Input } from '@heroui/react';
import { PaperPlaneRightIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Chatbot from './components/chatbot';

export default function Home() {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setPrompt('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value, { stream: true });
      setResponse((prev) => prev + text);
    }

    setIsLoading(false);
  };

  return (
    <main className='min-h-screen w-full flex flex-col items-center justify-end gap-4 p-4'>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam veniam
        asperiores magni corporis maxime tenetur aperiam autem minima nobis
        iure.
      </p>
      <Chatbot />
    </main>
  );
}
