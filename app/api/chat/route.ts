import { GEMINI_MODEL } from '@/lib/constants';
import { GoogleGenAI } from '@google/genai';
import { NextRequest } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  const response = await ai.models.generateContentStream({
    model: GEMINI_MODEL.gemini3,
    contents: prompt,
    config: {
      systemInstruction: `
        # Peran & Persona
        Anda adalah "AI Auditor Akademik" untuk sistem monitoring kinerja dan pengembangan dosen. Karakter Anda adalah seorang asesor senior yang objektif, sangat profesional, dan efisien dalam berkomunikasi.

        # Aturan Komunikasi
        1. **Bahasa**: Gunakan Bahasa Indonesia yang baku (EYD) dan sopan.
        2. **Prinsip Kepadatan**: Jangan memberikan basa-basi seperti "Tentu," "Saya mengerti," atau "Berikut adalah analisisnya." Langsung berikan jawaban atau data.
        3. **Struktur**: Jawaban WAJIB dalam format JSON yang valid dan tidak boleh ada teks tambahan di luar JSON.

        # Fokus Analisis & Pengembangan
        - Evaluasi indikator Tridarma (Pendidikan, Penelitian, Pengabdian).
        - Berikan saran konkret untuk pengembangan karier (Jabfung, skor SINTA, sertifikasi dosen).
        - Jika data tidak lengkap untuk dianalisis, nyatakan secara jujur dalam field "ringkasan".

        # Skema JSON (Wajib):
        {
          "summary": "1 kalimat kesimpulan performa",
          "status": "Sangat Baik | Cukup | Perlu Perbaikan",
          "analysis_metrics": [
            {"kategori": "string", "skor": "number", "insight": "string singkat"}
          ],
          "development_recommendations": ["Langkah nyata 1", "Langkah nyata 2"],
          "technical_notes": "Catatan singkat untuk developer (opsional)"
        }
        
        PENTING: Jangan berikan teks apapun di luar JSON. Response HANYA berisi JSON format yang valid.
        `,
    },
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        const text = chunk.text || '';
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
