import { describe, test, expect } from 'bun:test';
import { isValidJSON, parseAuditResponse } from '../lib/responseParser';

describe('isValidJSON', () => {
  test('should return true for valid JSON object', () => {
    expect(isValidJSON('{"key": "value"}')).toBe(true);
  });

  test('should return true for valid JSON array', () => {
    expect(isValidJSON('[1, 2, 3]')).toBe(true);
  });

  test('should return true for valid JSON string', () => {
    expect(isValidJSON('"hello"')).toBe(true);
  });

  test('should return true for valid JSON number', () => {
    expect(isValidJSON('42')).toBe(true);
  });

  test('should return false for invalid JSON', () => {
    expect(isValidJSON('not json')).toBe(false);
  });

  test('should return false for partial JSON', () => {
    expect(isValidJSON('{"key": "value"')).toBe(false);
  });

  test('should return false for empty string', () => {
    expect(isValidJSON('')).toBe(false);
  });

  test('should return false for markdown text', () => {
    expect(isValidJSON('## Heading\n- bullet point')).toBe(false);
  });
});

describe('parseAuditResponse', () => {
  test('should parse a valid audit response', () => {
    const validResponse = JSON.stringify({
      summary: 'Kinerja baik',
      status: 'Sangat Baik',
      analysis_metrics: [
        { kategori: 'Penelitian', skor: 85, insight: 'Produktif' },
      ],
      development_recommendations: ['Tingkatkan publikasi'],
    });

    const result = parseAuditResponse(validResponse);
    expect(result).not.toBeNull();
    expect(result!.summary).toBe('Kinerja baik');
    expect(result!.status).toBe('Sangat Baik');
    expect(result!.analysis_metrics).toHaveLength(1);
    expect(result!.development_recommendations).toContain('Tingkatkan publikasi');
  });

  test('should parse response with optional technical_notes', () => {
    const response = JSON.stringify({
      summary: 'Test',
      status: 'Cukup',
      analysis_metrics: [],
      development_recommendations: [],
      technical_notes: 'Some notes',
    });

    const result = parseAuditResponse(response);
    expect(result).not.toBeNull();
    expect(result!.technical_notes).toBe('Some notes');
  });

  test('should return null for missing summary field', () => {
    const response = JSON.stringify({
      status: 'Cukup',
      analysis_metrics: [],
    });

    expect(parseAuditResponse(response)).toBeNull();
  });

  test('should return null for missing status field', () => {
    const response = JSON.stringify({
      summary: 'Test',
      analysis_metrics: [],
    });

    expect(parseAuditResponse(response)).toBeNull();
  });

  test('should return null when analysis_metrics is not an array', () => {
    const response = JSON.stringify({
      summary: 'Test',
      status: 'Cukup',
      analysis_metrics: 'not an array',
    });

    expect(parseAuditResponse(response)).toBeNull();
  });

  test('should return null for invalid JSON string', () => {
    expect(parseAuditResponse('not json at all')).toBeNull();
  });

  test('should return null for empty string', () => {
    expect(parseAuditResponse('')).toBeNull();
  });

  test('should handle response with whitespace padding', () => {
    const response =
      '  \n' +
      JSON.stringify({
        summary: 'Trimmed',
        status: 'Perlu Perbaikan',
        analysis_metrics: [{ kategori: 'Test', skor: 50, insight: 'OK' }],
        development_recommendations: [],
      }) +
      '  \n';

    const result = parseAuditResponse(response);
    expect(result).not.toBeNull();
    expect(result!.summary).toBe('Trimmed');
  });

  test('should return null for markdown response (non-JSON)', () => {
    const markdownResponse = `
## Analisis Kinerja Dosen

**Status**: Sangat Baik

- Penelitian: skor 85
- Pendidikan: skor 90
    `;

    expect(parseAuditResponse(markdownResponse)).toBeNull();
  });
});
