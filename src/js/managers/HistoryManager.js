/**
 * History Manager - Handles undo/redo functionality
 */
export class HistoryManager {
  constructor(app) {
    this.app = app;
    this.stack = [];
    this.pointer = -1;
    this.limit = 20;
  }

  /**
   * Save current layer state to history
   */
  save() {
    if (!this.app) return;
    
    const layer = this.app.layers.getActive();
    if (!layer) return;

    // Remove any redo states if we made a new change
    if (this.pointer < this.stack.length - 1) {
      this.stack = this.stack.slice(0, this.pointer + 1);
    }

    const data = layer.ctx.getImageData(
      0,
      0,
      this.app.config.TEXTURE_SIZE,
      this.app.config.TEXTURE_SIZE
    );

    this.stack.push({ layerId: layer.id, data });

    // Maintain history limit
    if (this.stack.length > this.limit) {
      this.stack.shift();
    } else {
      this.pointer++;
    }
  }

  /**
   * Undo last action
   */
  undo() {
    if (this.pointer > 0) {
      this.pointer--;
      this.restore(this.stack[this.pointer]);
    }
  }

  /**
   * Redo last undone action
   */
  redo() {
    if (this.pointer < this.stack.length - 1) {
      this.pointer++;
      this.restore(this.stack[this.pointer]);
    }
  }

  /**
   * Restore a specific history state
   */
  restore(state) {
    if (!state) return;

    const layer = this.app.layers.layers.find((l) => l.id === state.layerId);
    if (layer) {
      layer.ctx.putImageData(state.data, 0, 0);
      this.app.layers.updateComposite();
    }
  }
}
