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

    this.container.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? this.config.ZOOM_STEP : -this.config.ZOOM_STEP;
        this.zoom(delta);
      },
      { passive: false }
    );

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

    this.paintAt(x, y);
  }

  /**
   * Paint logic at absolute coordinates (used by both 2D and 3D input)
   */
  paintAt(x, y, options = {}) {
    const layer = this.app.layers.getActive();
    if (!layer || !layer.visible) return;

    const size = parseInt(this.app.state.brushSize);
    const ctx = layer.ctx;
    const type = this.app.state.brushType;

    const drawBrush = (lx, ly) => {
      if (this.app.state.tool === 'brush') {
        ctx.save();
        ctx.globalAlpha = this.app.state.brushOpacity;
        ctx.fillStyle = this.app.state.color;

        if (type === 'circle') {
          ctx.beginPath();
          ctx.arc(lx + size / 2, ly + size / 2, size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (type === 'spray') {
          const particles = size * 8;
          for (let i = 0; i < particles; i++) {
            const radius = (Math.random() * size) / 2;
            const angle = Math.random() * Math.PI * 2;
            const px = lx + size / 2 + Math.cos(angle) * radius;
            const py = ly + size / 2 + Math.sin(angle) * radius;
            ctx.fillRect(Math.floor(px), Math.floor(py), 1, 1);
          }
        } else {
          ctx.fillRect(lx, ly, size, size);
        }

        ctx.restore();
      } else if (this.app.state.tool === 'eraser') {
        ctx.clearRect(lx, ly, size, size);
      }
    };

    drawBrush(x, y);

    if (this.app.state.mirrorMode) {
      const trueMirrorX = this.config.TEXTURE_SIZE - x - size;
      drawBrush(trueMirrorX, y);
    }

    if (this.app.state.tool === 'picker') {
      const p = this.app.layers.compositeCtx.getImageData(x, y, 1, 1).data;
      const hex = '#' + ('000000' + ((p[0] << 16) | (p[1] << 8) | p[2]).toString(16)).slice(-6);
      this.app.ui.setColor(hex);
      this.app.state.tool = 'brush';
      this.app.ui.updateTools();
    } else if (this.app.state.tool === 'fill') {
      ctx.save();
      ctx.globalAlpha = this.app.state.brushOpacity;
      ctx.fillStyle = this.app.state.color;
      ctx.fillRect(0, 0, this.config.TEXTURE_SIZE, this.config.TEXTURE_SIZE);
      ctx.restore();
      this.app.state.isDrawing = false;
      this.app.history.save();
    }

    this.app.layers.updateComposite();

    if (options.commitHistory) {
      this.app.history.save();
    }
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
