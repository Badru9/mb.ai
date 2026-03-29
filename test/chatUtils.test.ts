import { describe, test, expect } from 'bun:test';
import {
  getTimezoneContext,
  SYSTEM_INSTRUCTION,
  buildSystemInstruction,
  buildDatasetContext,
  convertToGeminiMessages,
  buildContents,
  type ChatMessage,
} from '../lib/chatUtils';

describe('getTimezoneContext', () => {
  test('should return a string containing WIB timezone', () => {
    const result = getTimezoneContext();
    expect(result).toContain('WIB');
    expect(result).toContain('UTC+7');
  });

  test('should contain "Waktu saat ini:" prefix', () => {
    const result = getTimezoneContext();
    expect(result).toContain('Waktu saat ini:');
  });

  test('should contain an ISO timestamp', () => {
    const result = getTimezoneContext();
    // ISO format contains T separator and Z or timezone
    expect(result).toContain('Timestamp ISO:');
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}T/);
  });

  test('should return a non-empty string', () => {
    const result = getTimezoneContext();
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('SYSTEM_INSTRUCTION', () => {
  test('should contain the datetime placeholder', () => {
    expect(SYSTEM_INSTRUCTION).toContain('{{DATETIME_CONTEXT}}');
  });

  test('should mention mb.ai persona', () => {
    expect(SYSTEM_INSTRUCTION).toContain('mb.ai');
  });

  test('should contain clarification phase instructions', () => {
    expect(SYSTEM_INSTRUCTION).toContain('Fase 1: Klarifikasi');
    expect(SYSTEM_INSTRUCTION).toContain('Fase 2: Jawaban Mendalam');
  });

  test('should contain guidelines for when to ask vs answer', () => {
    expect(SYSTEM_INSTRUCTION).toContain('LANGSUNG JAWAB');
    expect(SYSTEM_INSTRUCTION).toContain('TANYA DULU');
  });

  test('should mention Tridarma expertise', () => {
    expect(SYSTEM_INSTRUCTION).toContain('Tridarma');
    expect(SYSTEM_INSTRUCTION).toContain('Pendidikan');
    expect(SYSTEM_INSTRUCTION).toContain('Penelitian');
    expect(SYSTEM_INSTRUCTION).toContain('Pengabdian');
  });

  test('should contain dataset usage instructions', () => {
    expect(SYSTEM_INSTRUCTION).toContain('Dataset yang Tersedia');
    expect(SYSTEM_INSTRUCTION).toContain('JANGAN mengarang');
  });

  test('should require Bahasa Indonesia output', () => {
    expect(SYSTEM_INSTRUCTION).toContain('Bahasa Indonesia');
  });

  test('should require Markdown output format', () => {
    expect(SYSTEM_INSTRUCTION).toContain('Markdown');
  });
});

describe('buildSystemInstruction', () => {
  test('should replace {{DATETIME_CONTEXT}} placeholder', () => {
    const result = buildSystemInstruction();
    expect(result).not.toContain('{{DATETIME_CONTEXT}}');
  });

  test('should contain actual time context from getTimezoneContext', () => {
    const result = buildSystemInstruction();
    expect(result).toContain('Waktu saat ini:');
    expect(result).toContain('WIB');
  });

  test('should still contain the system instruction content', () => {
    const result = buildSystemInstruction();
    expect(result).toContain('mb.ai');
    expect(result).toContain('Tridarma');
  });
});

describe('buildDatasetContext', () => {
  test('should contain dosen data section', () => {
    const result = buildDatasetContext();
    expect(result).toContain('## Data Dosen');
  });

  test('should contain prodi data section', () => {
    const result = buildDatasetContext();
    expect(result).toContain('## Data Program Studi');
  });

  test('should contain actual dosen names from dataset', () => {
    const result = buildDatasetContext();
    expect(result).toContain('Dr. Ahmad Fauzi');
    expect(result).toContain('Prof. Dr. Siti Rahayu');
    expect(result).toContain('Budi Santoso');
  });

  test('should contain actual prodi names from dataset', () => {
    const result = buildDatasetContext();
    expect(result).toContain('Teknik Informatika');
    expect(result).toContain('Pendidikan Matematika');
  });

  test('should be valid for inclusion in a prompt (non-empty)', () => {
    const result = buildDatasetContext();
    expect(result.length).toBeGreaterThan(100);
  });
});

describe('convertToGeminiMessages', () => {
  test('should convert user messages correctly', () => {
    const messages: ChatMessage[] = [
      { role: 'user', content: 'Hello' },
    ];

    const result = convertToGeminiMessages(messages);
    expect(result).toHaveLength(1);
    expect(result[0].role).toBe('user');
    expect(result[0].parts[0].text).toBe('Hello');
  });

  test('should convert assistant role to model', () => {
    const messages: ChatMessage[] = [
      { role: 'assistant', content: 'Hi there' },
    ];

    const result = convertToGeminiMessages(messages);
    expect(result).toHaveLength(1);
    expect(result[0].role).toBe('model');
    expect(result[0].parts[0].text).toBe('Hi there');
  });

  test('should handle multi-turn conversation', () => {
    const messages: ChatMessage[] = [
      { role: 'user', content: 'Evaluasi dosen' },
      { role: 'assistant', content: 'Dosen mana yang ingin dievaluasi?' },
      { role: 'user', content: 'Dr. Ahmad Fauzi' },
    ];

    const result = convertToGeminiMessages(messages);
    expect(result).toHaveLength(3);
    expect(result[0].role).toBe('user');
    expect(result[1].role).toBe('model');
    expect(result[2].role).toBe('user');
  });

  test('should return empty array for empty input', () => {
    const result = convertToGeminiMessages([]);
    expect(result).toHaveLength(0);
  });

  test('should preserve message content exactly', () => {
    const content = 'Berapa skor SINTA Dr. Ahmad?\nDan berapa h-index-nya?';
    const messages: ChatMessage[] = [{ role: 'user', content }];

    const result = convertToGeminiMessages(messages);
    expect(result[0].parts[0].text).toBe(content);
  });
});

describe('buildContents', () => {
  test('should prepend 2 context messages before user messages', () => {
    const messages: ChatMessage[] = [
      { role: 'user', content: 'Hello' },
    ];

    const result = buildContents(messages);
    // 2 context messages + 1 user message = 3
    expect(result).toHaveLength(3);
  });

  test('first context message should be from user (dataset injection)', () => {
    const result = buildContents([{ role: 'user', content: 'test' }]);
    expect(result[0].role).toBe('user');
    expect(result[0].parts[0].text).toContain('Data Dosen');
  });

  test('second context message should be model acknowledgment', () => {
    const result = buildContents([{ role: 'user', content: 'test' }]);
    expect(result[1].role).toBe('model');
    expect(result[1].parts[0].text).toContain('Data dosen dan program studi sudah saya terima');
  });

  test('user messages should come after context messages', () => {
    const messages: ChatMessage[] = [
      { role: 'user', content: 'Evaluasi dosen Ahmad' },
      { role: 'assistant', content: 'Baik, mengevaluasi...' },
    ];

    const result = buildContents(messages);
    expect(result).toHaveLength(4); // 2 context + 2 user
    expect(result[2].parts[0].text).toBe('Evaluasi dosen Ahmad');
    expect(result[3].role).toBe('model');
  });

  test('should handle empty messages array', () => {
    const result = buildContents([]);
    // Should still have 2 context messages
    expect(result).toHaveLength(2);
    expect(result[0].role).toBe('user');
    expect(result[1].role).toBe('model');
  });

  test('context should contain actual dataset content', () => {
    const result = buildContents([{ role: 'user', content: 'test' }]);
    const contextText = result[0].parts[0].text;
    expect(contextText).toContain('Ahmad Fauzi');
    expect(contextText).toContain('Teknik Informatika');
  });
});
