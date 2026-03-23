export interface AuditResult {
  summary: string;
  status: 'Sangat Baik' | 'Cukup' | 'Perlu Perbaikan';
  analysis_metrics: Array<{
    kategori: string;
    skor: number;
    insight: string;
  }>;
  development_recommendations: string[];
  technical_notes?: string;
}

export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export const parseAuditResponse = (response: string): AuditResult | null => {
  try {
    const cleaned = response.trim();
    const data = JSON.parse(cleaned);

    // Validate required fields
    if (data.summary && data.status && Array.isArray(data.analysis_metrics)) {
      return data as AuditResult;
    }
    return null;
  } catch {
    return null;
  }
};
