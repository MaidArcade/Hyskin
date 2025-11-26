/**
 * Main Application Class
 */
import { CONFIG, getInitialState, DEFAULT_PALETTE } from './config/constants.js';
import { HistoryManager } from './managers/HistoryManager.js';
import { LayerManager } from './managers/LayerManager.js';
import { UIManager } from './managers/UIManager.js';
import { AIManager } from './managers/AIManager.js';
import { Editor2D } from './editors/Editor2D.js';
import { Viewer3D } from './viewers/Viewer3D.js';

export class App {
  constructor() {
    this.config = CONFIG;
    this.state = getInitialState();
    this.DEFAULT_PALETTE = DEFAULT_PALETTE;

    // Initialize managers
    this.history = new HistoryManager(this);
    this.layers = new LayerManager(this, CONFIG);
    this.ui = new UIManager(this, CONFIG);
    this.ai = new AIManager(this);

    // Initialize editors on next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      this.editor = new Editor2D(this, CONFIG);
      this.viewer = new Viewer3D(this.layers.compositeCanvas, 'viewer-3d', this);

      // Load default texture if available
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => this.layers.loadBaseImage(img);
      img.onerror = () => console.log('No default texture found.');
      img.src = CONFIG.DEFAULT_TEXTURE_URL;
    });
  }

  /**
   * Export skin as PNG
   */
  exportSkin() {
    const link = document.createElement('a');
    link.download = `HytaleSkin_${Date.now()}.png`;
    link.href = this.layers.compositeCanvas.toDataURL('image/png');
    link.click();
  }

  /**
   * Save to cloud (placeholder)
   */
  saveToCloud() {
    const btn = document.querySelector('button[onclick="app.saveToCloud()"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Guardado';
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2000);
    }, 1000);
  }
}

// Initialize app
window.app = new App();
