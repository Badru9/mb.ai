import { describe, test, expect, mock, beforeEach } from 'bun:test';

// ============================================================
// Pure logic extracted from chatbot.tsx — tested independently
// ============================================================

// --- handleSubmit guard logic ---
function shouldSubmit(input: string, isLoading: boolean): boolean {
  return input.trim().length > 0 && !isLoading;
}

// --- Message builder ---
type Role = 'user' | 'assistant';
interface Message {
  role: Role;
  content: string;
}

function buildUserMessage(input: string): Message {
  return { role: 'user', content: input.trim() };
}

function buildAssistantMessage(content: string): Message {
  return { role: 'assistant', content };
}

function appendMessage(messages: Message[], newMessage: Message): Message[] {
  return [...messages, newMessage];
}

// --- Streaming state helpers ---
function accumulateStream(current: string, chunk: string): string {
  return current + chunk;
}

// --- GSAP ScrollTrigger direction logic ---
type AnimationTarget = { scale: number; opacity: number };

function getScrollAnimation(direction: -1 | 1): AnimationTarget {
  if (direction === -1) {
    // Scrolling UP → shrink
    return { scale: 0.75, opacity: 0.5 };
  }
  // Scrolling DOWN → restore
  return { scale: 1, opacity: 1 };
}

// --- Fetch payload builder ---
function buildChatPayload(messages: Message[]) {
  return {
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  };
}

// ============================================================
// TESTS
// ============================================================

describe('shouldSubmit (handleSubmit guard)', () => {
  test('returns true for valid input and not loading', () => {
    expect(shouldSubmit('Hello', false)).toBe(true);
  });

  test('returns false for empty input', () => {
    expect(shouldSubmit('', false)).toBe(false);
  });

  test('returns false for whitespace-only input', () => {
    expect(shouldSubmit('   ', false)).toBe(false);
  });

  test('returns false when isLoading is true', () => {
    expect(shouldSubmit('Hello', true)).toBe(false);
  });

  test('returns false for empty input AND loading', () => {
    expect(shouldSubmit('', true)).toBe(false);
  });

  test('trims whitespace before checking', () => {
    expect(shouldSubmit('  Hello  ', false)).toBe(true);
  });
});

describe('buildUserMessage', () => {
  test('builds message with user role', () => {
    const msg = buildUserMessage('Apa itu Tridarma?');
    expect(msg.role).toBe('user');
  });

  test('trims whitespace from content', () => {
    const msg = buildUserMessage('  Hello world  ');
    expect(msg.content).toBe('Hello world');
  });

  test('preserves content correctly', () => {
    const msg = buildUserMessage('Evaluasi dosen Ahmad');
    expect(msg.content).toBe('Evaluasi dosen Ahmad');
  });
});

describe('buildAssistantMessage', () => {
  test('builds message with assistant role', () => {
    const msg = buildAssistantMessage('Baik, saya akan bantu.');
    expect(msg.role).toBe('assistant');
  });

  test('preserves full response content', () => {
    const content = '## Hasil Evaluasi\n- Point 1\n- Point 2';
    const msg = buildAssistantMessage(content);
    expect(msg.content).toBe(content);
  });

  test('handles empty content', () => {
    const msg = buildAssistantMessage('');
    expect(msg.content).toBe('');
    expect(msg.role).toBe('assistant');
  });
});

describe('appendMessage', () => {
  test('appends message to empty array', () => {
    const result = appendMessage([], { role: 'user', content: 'Hi' });
    expect(result).toHaveLength(1);
  });

  test('appends without mutating original array', () => {
    const original: Message[] = [{ role: 'user', content: 'Existing' }];
    const result = appendMessage(original, { role: 'assistant', content: 'Reply' });
    expect(original).toHaveLength(1); // original unchanged
    expect(result).toHaveLength(2);
  });

  test('preserves order of messages', () => {
    const msgs: Message[] = [
      { role: 'user', content: 'First' },
      { role: 'assistant', content: 'Second' },
    ];
    const result = appendMessage(msgs, { role: 'user', content: 'Third' });
    expect(result[0].content).toBe('First');
    expect(result[1].content).toBe('Second');
    expect(result[2].content).toBe('Third');
  });

  test('multi-turn conversation structure is valid', () => {
    let messages: Message[] = [];
    messages = appendMessage(messages, buildUserMessage('Tanya 1'));
    messages = appendMessage(messages, buildAssistantMessage('Jawab 1'));
    messages = appendMessage(messages, buildUserMessage('Tanya 2'));

    expect(messages).toHaveLength(3);
    expect(messages[0].role).toBe('user');
    expect(messages[1].role).toBe('assistant');
    expect(messages[2].role).toBe('user');
  });
});

describe('accumulateStream (streaming content state)', () => {
  test('starts empty and accumulates chunks', () => {
    let content = '';
    content = accumulateStream(content, 'Halo, ');
    content = accumulateStream(content, 'saya mb.ai.');
    expect(content).toBe('Halo, saya mb.ai.');
  });

  test('handles single chunk', () => {
    expect(accumulateStream('', 'chunk')).toBe('chunk');
  });

  test('handles empty chunk', () => {
    expect(accumulateStream('existing', '')).toBe('existing');
  });

  test('preserves all whitespace and newlines', () => {
    let content = '';
    content = accumulateStream(content, '## Title\n');
    content = accumulateStream(content, '- Item 1\n');
    content = accumulateStream(content, '- Item 2');
    expect(content).toBe('## Title\n- Item 1\n- Item 2');
  });
});

describe('getScrollAnimation (GSAP ScrollTrigger direction logic)', () => {
  test('direction -1 (scroll UP) returns shrink state', () => {
    const anim = getScrollAnimation(-1);
    expect(anim.scale).toBe(0.75);
    expect(anim.opacity).toBe(0.5);
  });

  test('direction 1 (scroll DOWN) returns full size state', () => {
    const anim = getScrollAnimation(1);
    expect(anim.scale).toBe(1);
    expect(anim.opacity).toBe(1);
  });

  test('scroll UP produces smaller scale than scroll DOWN', () => {
    const up = getScrollAnimation(-1);
    const down = getScrollAnimation(1);
    expect(up.scale).toBeLessThan(down.scale);
  });

  test('scroll UP produces lower opacity than scroll DOWN', () => {
    const up = getScrollAnimation(-1);
    const down = getScrollAnimation(1);
    expect(up.opacity).toBeLessThan(down.opacity);
  });

  test('scroll DOWN restores to full opacity', () => {
    const anim = getScrollAnimation(1);
    expect(anim.opacity).toBe(1);
  });

  test('scroll DOWN restores to full scale', () => {
    const anim = getScrollAnimation(1);
    expect(anim.scale).toBe(1);
  });
});

describe('buildChatPayload', () => {
  test('maps messages to correct API shape', () => {
    const messages: Message[] = [
      { role: 'user', content: 'Hello' },
      { role: 'assistant', content: 'Hi!' },
    ];
    const payload = buildChatPayload(messages);

    expect(payload.messages).toHaveLength(2);
    expect(payload.messages[0]).toEqual({ role: 'user', content: 'Hello' });
    expect(payload.messages[1]).toEqual({ role: 'assistant', content: 'Hi!' });
  });

  test('returns empty messages array for empty input', () => {
    const payload = buildChatPayload([]);
    expect(payload.messages).toHaveLength(0);
  });

  test('does not include extra fields in mapped output', () => {
    const messages: Message[] = [{ role: 'user', content: 'Test' }];
    const payload = buildChatPayload(messages);
    const keys = Object.keys(payload.messages[0]);
    expect(keys).toContain('role');
    expect(keys).toContain('content');
    expect(keys).toHaveLength(2);
  });

  test('serializes correctly as JSON', () => {
    const messages: Message[] = [{ role: 'user', content: 'Test JSON' }];
    const payload = buildChatPayload(messages);
    const json = JSON.stringify(payload);
    expect(json).toContain('"role":"user"');
    expect(json).toContain('"content":"Test JSON"');
  });
});
