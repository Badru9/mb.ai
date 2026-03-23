'use client';

import { Button, Input } from '@heroui/react';
import { PaperPlaneRightIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import AuditResultCard from './AuditResultCard';
import { parseAuditResponse, type AuditResult } from '@/lib/responseParser';

export default function Chatbot() {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [parsedResult, setParsedResult] = useState<AuditResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setParsedResult(null);
    setPrompt('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value, { stream: true });
      fullResponse += text;
      setResponse(fullResponse);
    }

    // Try to parse as JSON
    const parsed = parseAuditResponse(fullResponse);
    if (parsed) {
      setParsedResult(parsed);
    }

    setIsLoading(false);
  };

  return (
    <main className='min-h-screen w-full flex flex-col items-center justify-end gap-4 p-4'>
      <div className='w-1/2 flex-1 overflow-y-auto max-w-none'>
        {isLoading && !response ? (
          <p className='text-slate-400'>Thinking...</p>
        ) : parsedResult ? (
          <AuditResultCard data={parsedResult} />
        ) : response ? (
          <div className='prose prose-invert max-w-none'>
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
          </div>
        ) : (
          <p className='text-slate-400'>Tanya apapun!</p>
        )}
      </div>
      <div className='w-1/2 fixed bottom-10 left-0 translate-x-[50%]'>
        <Input
          label='Curhatin sama mb.ai'
          variant='bordered'
          radius='full'
          color='primary'
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
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
