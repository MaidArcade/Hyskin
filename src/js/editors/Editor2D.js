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
    this.overlay = this.createOverlayCanvas('selection-overlay');
    this.selectionCanvas = this.createOverlayCanvas('selection-preview');
    this.selection = null;
    this.draggingSelection = false;
    this.panning = false;
    this.panStart = null;
    this.setupEvents();
    this.zoom(0);
  }

  /**
   * Create overlay canvas for helpers
   */
  createOverlayCanvas(id) {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.width = this.config.TEXTURE_SIZE;
    canvas.height = this.config.TEXTURE_SIZE;
    canvas.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'pointer-events-none');
    this.container.appendChild(canvas);
    return canvas;
  }

  /**
   * Setup mouse and touch events
   */
  setupEvents() {
    const start = (e) => {
      const tool = this.app.state.tool;
      if (tool === 'hand') {
        this.beginPan(e);
        e.preventDefault();
        return;
      }

      if (tool === 'zoom') {
        this.handleZoomTool(e);
        e.preventDefault();
        return;
      }

      if (tool === 'select') {
        this.beginSelection(e);
        e.preventDefault();
        return;
      }

      if (tool === 'move' && this.selection && this.isInsideSelection(e)) {
        this.startDraggingSelection(e);
        e.preventDefault();
        return;
      }

      this.app.state.isDrawing = true;
      this.paint(e);
      e.preventDefault();
    };

    const move = (e) => {
      if (this.panning) {
        this.updatePan(e);
        return;
      }

      if (this.draggingSelection) {
        this.updateDraggedSelection(e);
        return;
      }

      if (this.selection && this.app.state.tool === 'select') {
        this.updateSelection(e);
        return;
      }

      if (this.app.state.isDrawing) this.paint(e);
    };

    const end = () => {
      if (this.app.state.isDrawing) {
        this.app.state.isDrawing = false;
        this.app.history.save();
      } else if (this.selection && this.app.state.tool === 'select') {
        this.finalizeSelection();
      } else if (this.draggingSelection) {
        this.dropSelection();
      } else if (this.panning) {
        this.panning = false;
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

  /** Selection helpers */
  beginSelection(e) {
    this.resetSelection();
    const coords = this.getCoords(e);
    this.selection = {
      start: coords,
      current: coords,
      active: false,
      data: null
    };
    this.drawSelectionBox();
  }

  updateSelection(e) {
    if (!this.selection) return;
    this.selection.current = this.getCoords(e);
    this.drawSelectionBox();
  }

  finalizeSelection() {
    if (!this.selection) return;
    const layer = this.app.layers.getActive();
    if (!layer) return;

    const rect = this.getSelectionRect();
    if (rect.w <= 0 || rect.h <= 0) {
      this.resetSelection();
      return;
    }

    const imageData = layer.ctx.getImageData(rect.x, rect.y, rect.w, rect.h);
    const preview = document.createElement('canvas');
    preview.width = rect.w;
    preview.height = rect.h;
    preview.getContext('2d').putImageData(imageData, 0, 0);

    layer.ctx.clearRect(rect.x, rect.y, rect.w, rect.h);
    this.app.layers.updateComposite();

    this.selection = {
      ...this.selection,
      active: true,
      rect,
      data: preview,
      offset: { x: 0, y: 0 }
    };

    this.drawSelectionPreview();
    this.app.history.save();
  }

  resetSelection() {
    this.selection = null;
    this.overlay.getContext('2d').clearRect(0, 0, this.config.TEXTURE_SIZE, this.config.TEXTURE_SIZE);
    this.selectionCanvas
      .getContext('2d')
      .clearRect(0, 0, this.config.TEXTURE_SIZE, this.config.TEXTURE_SIZE);
  }

  drawSelectionBox() {
    const ctx = this.overlay.getContext('2d');
    ctx.clearRect(0, 0, this.config.TEXTURE_SIZE, this.config.TEXTURE_SIZE);
    if (!this.selection) return;
    const offset = this.selection.offset || { x: 0, y: 0 };
    const baseRect = this.selection.active ? this.selection.rect : this.getSelectionRect();
    const x = baseRect.x + offset.x;
    const y = baseRect.y + offset.y;
    const w = baseRect.w;
    const h = baseRect.h;
    ctx.setLineDash([4, 2]);
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, w, h);
  }

  drawSelectionPreview() {
    const ctx = this.selectionCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.config.TEXTURE_SIZE, this.config.TEXTURE_SIZE);
    if (!this.selection?.active || !this.selection.data) return;
    const { rect, offset } = this.selection;
    ctx.drawImage(this.selection.data, rect.x + offset.x, rect.y + offset.y);
    this.drawSelectionBox();
  }

  getSelectionRect() {
    const { start, current } = this.selection;
    const x = Math.min(start.x, current.x);
    const y = Math.min(start.y, current.y);
    const w = Math.abs(start.x - current.x) + 1;
    const h = Math.abs(start.y - current.y) + 1;
    return { x, y, w, h };
  }

  isInsideSelection(e) {
    if (!this.selection?.active) return false;
    const { x, y } = this.getCoords(e);
    const rect = this.selection.rect;
    const offset = this.selection.offset || { x: 0, y: 0 };
    return (
      x >= rect.x + offset.x &&
      x <= rect.x + offset.x + rect.w &&
      y >= rect.y + offset.y &&
      y <= rect.y + offset.y + rect.h
    );
  }

  startDraggingSelection(e) {
    this.draggingSelection = true;
    this.dragOrigin = this.getCoords(e);
    this.selection.startOffset = { ...this.selection.offset };
  }

  updateDraggedSelection(e) {
    if (!this.draggingSelection || !this.selection) return;
    const { x, y } = this.getCoords(e);
    this.selection.offset = {
      x: this.selection.startOffset.x + (x - this.dragOrigin.x),
      y: this.selection.startOffset.y + (y - this.dragOrigin.y)
    };
    this.drawSelectionPreview();
  }

  dropSelection() {
    if (!this.selection?.data) return;
    const layer = this.app.layers.getActive();
    if (!layer) return;
    const { rect, offset } = this.selection;
    layer.ctx.drawImage(this.selection.data, rect.x + offset.x, rect.y + offset.y);
    this.app.layers.updateComposite();
    this.draggingSelection = false;
    this.resetSelection();
    this.app.history.save();
  }

  /** Panning and zoom tools */
  beginPan(e) {
    const container = document.getElementById('editor-container');
    this.panning = true;
    this.panStart = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop
    };
  }

  updatePan(e) {
    const container = document.getElementById('editor-container');
    container.scrollLeft = this.panStart.scrollLeft - (e.clientX - this.panStart.x);
    container.scrollTop = this.panStart.scrollTop - (e.clientY - this.panStart.y);
  }

  handleZoomTool(e) {
    const delta = e.altKey || e.button === 2 ? -this.config.ZOOM_STEP : this.config.ZOOM_STEP;
    this.zoom(delta);
  }
}
