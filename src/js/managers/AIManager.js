/**
 * AI Manager - Handles Gemini API integration
 */
export class AIManager {
  constructor(app) {
    this.app = app;
    this.apiKey = window.GEMINI_API_KEY || '';
    this.modal = document.getElementById('ai-modal');
    this.resultsDiv = document.getElementById('ai-results');
    this.inputPrompt = document.getElementById('palette-prompt');
    this.currentTab = 'palette';
  }

  /**
   * Toggle AI modal visibility
   */
  toggleModal() {
    this.modal.classList.toggle('hidden');
  }

  /**
   * Switch between tabs
   */
  setTab(tab) {
    this.currentTab = tab;

    // Update palette tab styles
    document.getElementById('tab-palette').classList.toggle('bg-white', tab === 'palette');
    document.getElementById('tab-palette').classList.toggle('shadow-sm', tab === 'palette');
    document.getElementById('tab-palette').classList.toggle('text-purple-600', tab === 'palette');
    document.getElementById('tab-palette').classList.toggle('text-slate-500', tab !== 'palette');

    // Update critic tab styles
    document.getElementById('tab-critic').classList.toggle('bg-white', tab === 'critic');
    document.getElementById('tab-critic').classList.toggle('shadow-sm', tab === 'critic');
    document.getElementById('tab-critic').classList.toggle('text-purple-600', tab === 'critic');
    document.getElementById('tab-critic').classList.toggle('text-slate-500', tab !== 'critic');

    // Show/hide panels
    document.getElementById('panel-palette').classList.toggle('hidden', tab !== 'palette');
    document.getElementById('panel-critic').classList.toggle('hidden', tab !== 'critic');

    this.resultsDiv.innerHTML = '<div class="text-center text-slate-400 mt-4">Los resultados aparecerán aquí...</div>';
  }

  /**
   * Call Gemini API
   */
  async callGemini(prompt, imageBase64 = null) {
    if (!this.apiKey) {
      this.resultsDiv.innerHTML =
        '<div class="text-red-500">Error: API key no configurada. Configura GEMINI_API_KEY.</div>';
      return null;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${this.apiKey}`;

    const parts = [{ text: prompt }];

    if (imageBase64) {
      const base64Data = imageBase64.split(',')[1];
      parts.push({
        inlineData: {
          mimeType: 'image/png',
          data: base64Data
        }
      });
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: parts }] })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Error en la API de Gemini');
      }

      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta';
    } catch (error) {
      console.error('Gemini API error:', error);
      return `Error: ${error.message}`;
    }
  }

  /**
   * Generate color palette with AI
   */
  async generatePalette() {
    const theme = this.inputPrompt.value.trim();
    if (!theme) {
      alert('Por favor, describe el tema de la skin');
      return;
    }

    this.resultsDiv.innerHTML =
      '<div class="flex justify-center p-4"><i class="fas fa-spinner fa-spin text-purple-500 text-2xl"></i></div>';

    const prompt = `Generate a JSON array of 6 distinct hexadecimal color codes that fit a Hytale character skin theme: "${theme}". Return ONLY the JSON array, no text. Example: ["#ffffff", "#000000"]`;

    const response = await this.callGemini(prompt);

    if (!response) return;

    try {
      const jsonStr = response.replace(/```json|```|`/g, '').trim();
      const colors = JSON.parse(jsonStr);

      if (Array.isArray(colors)) {
        this.app.ui.updatePalette(colors);
        this.resultsDiv.innerHTML = `<div class="text-green-600 font-bold mb-2">¡Paleta "${theme}" aplicada!</div><div class="flex gap-1">${colors
          .map(
            (c) =>
              `<div class="w-6 h-6 rounded border border-slate-200" style="background:${c}"></div>`
          )
          .join('')}</div>`;
      } else {
        throw new Error('Formato inválido');
      }
    } catch (e) {
      this.resultsDiv.innerHTML =
        '<div class="text-red-500">No se pudo generar la paleta. Intenta de nuevo.</div>';
      console.error('Parse error:', e);
    }
  }

  /**
   * Analyze current skin with AI
   */
  async analyzeSkin() {
    const canvas = this.app.layers.compositeCanvas;
    const base64 = canvas.toDataURL('image/png');

    this.resultsDiv.innerHTML =
      '<div class="flex justify-center p-4"><i class="fas fa-spinner fa-spin text-indigo-500 text-2xl"></i></div>';

    const prompt =
      'Actúa como un artista experto en pixel art para videojuegos como Hytale. Analiza esta textura de skin de personaje (mapa UV). Dame 3 consejos breves y constructivos para mejorar el diseño, el sombreado o la elección de colores. Responde en español, formato markdown lista.';

    const response = await this.callGemini(prompt, base64);

    if (response && window.marked) {
      this.resultsDiv.innerHTML = window.marked.parse(response);
    } else {
      this.resultsDiv.innerHTML = `<pre>${response}</pre>`;
    }
  }
}
