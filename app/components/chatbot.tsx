'use client';

import { Button, Input } from '@heroui/react';
import { PaperPlaneRightIcon } from '@phosphor-icons/react';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const MarkdownRenderer = ({ content }: { content: string }) => (
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
          <code className='bg-slate-200 px-1.5 py-0.5 rounded text-sm text-slate-800'>
            {children}
          </code>
        ) : (
          <code className={className}>{children}</code>
        );
      },
      strong: ({ children }) => (
        <strong className='font-semibold text-slate-800'>{children}</strong>
      ),
      em: ({ children }) => (
        <em className='italic text-slate-700'>{children}</em>
      ),
      p: ({ children }) => (
        <p className='text-slate-800 mb-2 last:mb-0'>{children}</p>
      ),
      li: ({ children }) => <li className='text-slate-800'>{children}</li>,
      ol: ({ children }) => (
        <ol className='list-decimal list-inside text-slate-800 space-y-1'>
          {children}
        </ol>
      ),
      ul: ({ children }) => (
        <ul className='list-disc list-inside text-slate-800 space-y-1'>
          {children}
        </ul>
      ),
      h1: ({ children }) => (
        <h1 className='text-xl font-bold text-slate-900 mb-2'>{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className='text-lg font-bold text-slate-900 mb-2'>{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className='text-base font-semibold text-slate-900 mb-1'>
          {children}
        </h3>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
);

export default function Chatbot() {
  const chatbotInputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streamingContent, setStreamingContent] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  useGSAP(() => {
    const wrapper = inputWrapperRef.current;
    if (!wrapper) return;

    gsap.set(wrapper, {
      scale: 1,
      opacity: 1,
      transformOrigin: 'bottom center',
    });

    ScrollTrigger.create({
      trigger: '#chatbot-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (self.direction === -1) {
          gsap.to(wrapper, {
            scale: 0.75,
            opacity: 0.5,
            duration: 0.4,
            ease: 'power2.out',
          });
        } else {
          gsap.to(wrapper, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      },
    });
  });

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setIsLoading(true);
    setStreamingContent('');
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: updatedMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
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
      setStreamingContent(fullResponse);
    }

    const assistantMessage: Message = {
      role: 'assistant',
      content: fullResponse,
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setStreamingContent('');
    setIsLoading(false);
  };

  return (
    <main
      // ref={chatbotInputRef}
      id='chatbot-wrapper'
      className='relative min-h-screen w-full flex flex-col items-center justify-end gap-4 p-4'
    >
      <div className='w-1/2 flex-1 overflow max-w-none space-y-4 pb-20'>
        {messages.length === 0 && !isLoading ? (
          <p className='text-slate-400 text-lg'>Tanya apapun ke mb.ai! 💬</p>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-slate-100 text-slate-800 rounded-bl-md'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className='whitespace-pre-wrap'>{msg.content}</p>
                  ) : (
                    <div className='prose prose-sm max-w-none'>
                      <MarkdownRenderer content={msg.content} />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Streaming response */}
            {isLoading && streamingContent && (
              <div className='flex justify-start'>
                <div className='max-w-[80%] rounded-2xl px-4 py-3 bg-slate-100 text-slate-800 rounded-bl-md'>
                  <div className='prose prose-sm max-w-none'>
                    <MarkdownRenderer content={streamingContent} />
                  </div>
                </div>
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && !streamingContent && (
              <div className='flex justify-start'>
                <div className='rounded-2xl px-4 py-3 bg-slate-100 text-slate-400 rounded-bl-md'>
                  <span className='animate-pulse'>
                    mb.ai sedang berpikir...
                  </span>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div
        ref={inputWrapperRef}
        className='w-1/2 fixed bottom-10 left-0 translate-x-[50%]'
      >
        <Input
          label='Curhatin sama mb.ai'
          ref={chatbotInputRef}
          id='chatbot-input'
          variant='faded'
          radius='full'
          color='primary'
          value={input}
          onChange={(event) => setInput(event.target.value)}
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
