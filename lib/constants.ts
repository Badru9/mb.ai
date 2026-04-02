export const GEMINI_MODEL = {
  gemini3: 'gemini-3-flash-preview',
  gemini3pro: 'gemini-3.1-pro-preview',
  gemini2: 'gemini-2.5-flash',
};

// Urutan prioritas model untuk fallback.
// Jika model pertama gagal (token habis / rate limit), akan dicoba model berikutnya.
export const GEMINI_MODEL_FALLBACK_ORDER: string[] = [
  GEMINI_MODEL.gemini2,
  GEMINI_MODEL.gemini3,
  GEMINI_MODEL.gemini3pro,
];
