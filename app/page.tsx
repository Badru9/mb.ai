'use client';

import { Button, Input } from '@heroui/react';
import { PaperPlaneRightIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

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
      <div className='w-1/2 flex-1 overflow-y-auto prose prose-invert max-w-none'>
        {isLoading && !response ? (
          <p>Thinking...</p>
        ) : response ? (
          <ReactMarkdown
            components={{
              pre: ({ children }) => (
                <pre className='bg-slate-900 p-4 rounded-lg overflow-x-auto'>
                  {children}
                </pre>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                return isInline ? (
                  <code className='bg-slate-800 px-1.5 py-0.5 rounded text-sm'>
                    {children}
                  </code>
                ) : (
                  <code className={className}>{children}</code>
                );
              },
              strong: ({ children }) => (
                <strong className='font-semibold text-slate-800'>
                  {children}
                </strong>
              ),
              i: ({ children }) => (
                <em className='italic text-slate-900'>{children}</em>
              ),
              p: ({ children }) => (
                <span className='text-slate-900'>{children}</span>
              ),
              li: ({ children }) => (
                <li className='text-slate-800'>{children}</li>
              ),
              ol: ({ children }) => (
                <ol className='list-decimal text-slate-900'>{children}</ol>
              ),
              ul: ({ children }) => (
                <ul className='list-disc list-inside text-slate-900'>
                  {children}
                </ul>
              ),
            }}
          >
            {response}
          </ReactMarkdown>
        ) : (
          <p>Ask me anything!</p>
        )}
      </div>
      <div className='w-1/2'>
        <Input
          label='Curhatin sama mb.ai'
          variant='bordered'
          radius='full'
          color='primary'
          onChange={(event) => setPrompt(event.target.value)}
          endContent={
            <Button
              isIconOnly
              radius='full'
              variant='light'
              isDisabled={isLoading}
              onPress={() => handleSubmit()}
            >
              <PaperPlaneRightIcon
                size={20}
                weight='bold'
                className='text-primary'
              />
            </Button>
          }
        />
      </div>
    </main>
  );
}
