/**
 * 2D Editor - Handles canvas drawing and painting
 */
export class Editor2D {
  constructor(app, config) {
    this.app = app;
    this.config = config;
    this.container = document.getElementById('canvas-wrapper');
    this.container.style.width = `${config.TEXTURE_SIZE}px`;
    this.container.style.height = `${config.TEXTURE_SIZE}px`;
    this.setupEvents();
    this.zoom(0);
  }

  /**
   * Setup mouse and touch events
   */
  setupEvents() {
    const start = (e) => {
      this.app.state.isDrawing = true;
      this.paint(e);
      e.preventDefault();
    };

    const move = (e) => {
      if (this.app.state.isDrawing) this.paint(e);
    };

    const end = () => {
      if (this.app.state.isDrawing) {
        this.app.state.isDrawing = false;
        this.app.history.save();
      }
    };

    this.container.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);

    // Touch support
    this.container.addEventListener('touchstart', (e) => start(e.touches[0]));
    window.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
        move(e.touches[0]);
      },
      { passive: false }
    );
    window.addEventListener('touchend', end);
  }

  /**
   * Get canvas coordinates from mouse/touch event
   */
  getCoords(e) {
    const rect = this.container.getBoundingClientRect();
    const scale = this.config.TEXTURE_SIZE / rect.width;
    const x = Math.floor((e.clientX - rect.left) * scale);
    const y = Math.floor((e.clientY - rect.top) * scale);
    return { x, y };
  }

  /**
   * Paint on canvas
   */
  paint(e) {
    if (!this.app) return;

    const layer = this.app.layers.getActive();
    if (!layer || !layer.visible) return;

    const { x, y } = this.getCoords(e);

    if (x < 0 || x >= this.config.TEXTURE_SIZE || y < 0 || y >= this.config.TEXTURE_SIZE) {
      return;
    }

    const ctx = layer.ctx;
    const size = parseInt(this.app.state.brushSize);

    const draw = (lx, ly) => {
      if (this.app.state.tool === 'brush') {
        ctx.fillStyle = this.app.state.color;
        ctx.fillRect(lx, ly, size, size);
      } else if (this.app.state.tool === 'eraser') {
        ctx.clearRect(lx, ly, size, size);
      }
    };

    draw(x, y);

    // Mirror mode
    if (this.app.state.mirrorMode) {
      const trueMirrorX = this.config.TEXTURE_SIZE - x - size;
      draw(trueMirrorX, y);
    }

    // Color picker
    if (this.app.state.tool === 'picker') {
      const p = this.app.layers.compositeCtx.getImageData(x, y, 1, 1).data;
      const hex = '#' + ('000000' + ((p[0] << 16) | (p[1] << 8) | p[2]).toString(16)).slice(-6);
      this.app.ui.setColor(hex);
      this.app.state.tool = 'brush';
      this.app.ui.updateTools();
    } else if (this.app.state.tool === 'fill') {
      ctx.fillStyle = this.app.state.color;
      ctx.fillRect(0, 0, this.config.TEXTURE_SIZE, this.config.TEXTURE_SIZE);
      this.app.state.isDrawing = false;
      this.app.history.save();
    }

    this.app.layers.updateComposite();
  }

  /**
   * Zoom in/out
   */
  zoom(delta) {
    this.app.state.zoom = Math.max(
      this.config.ZOOM_MIN,
      Math.min(this.config.ZOOM_MAX, this.app.state.zoom + delta)
    );
    this.container.style.transform = `scale(${this.app.state.zoom})`;
    document.getElementById('zoom-level').innerText = Math.round(this.app.state.zoom * 100) + '%';
  }
}
