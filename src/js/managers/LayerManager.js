/**
 * Layer Manager - Handles layer creation, visibility, and composition
 */
export class LayerManager {
  constructor(app, config) {
    this.app = app;
    this.config = config;
    this.layers = [];
    this.listElement = document.getElementById('layers-list');
    
    // Create composite canvas
    this.compositeCanvas = document.createElement('canvas');
    this.compositeCanvas.width = config.TEXTURE_SIZE;
    this.compositeCanvas.height = config.TEXTURE_SIZE;
    this.compositeCtx = this.compositeCanvas.getContext('2d', {
      willReadFrequently: true
    });

    this.initializeDefaultLayers();
  }

  /**
   * Initialize default layers
   */
  initializeDefaultLayers() {
    this.addLayer('Detalles / Top');
    this.addLayer('Ropa');
    this.addLayer('Piel Base');

    if (this.layers.length > 0) {
      this.setActive(this.layers[this.layers.length - 1].id);
    }
  }

  /**
   * Add a new layer
   */
  addLayer(name = 'Capa') {
    const id = this.app.state.layerCounter++;
    const canvas = document.createElement('canvas');
    canvas.width = this.config.TEXTURE_SIZE;
    canvas.height = this.config.TEXTURE_SIZE;
    canvas.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'pointer-events-none');

    const wrapper = document.getElementById('canvas-wrapper');
    wrapper.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, this.config.TEXTURE_SIZE, this.config.TEXTURE_SIZE);

    const layer = {
      id,
      name,
      canvas,
      visible: true,
      ctx
    };

    this.layers.unshift(layer);
    this.renderUI();

    return layer;
  }

  /**
   * Set active layer by id
   */
  setActive(id) {
    this.app.state.activeLayerId = id;
    this.renderUI();
  }

  /**
   * Get active layer
   */
  getActive() {
    return this.layers.find((l) => l.id === this.app.state.activeLayerId);
  }

  /**
   * Toggle layer visibility
   */
  toggleVisibility(id) {
    const layer = this.layers.find((l) => l.id === id);
    if (layer) {
      layer.visible = !layer.visible;
      layer.canvas.style.display = layer.visible ? 'block' : 'none';
      this.updateComposite();
      this.renderUI();
    }
  }

  /**
   * Render layers UI
   */
  renderUI() {
    this.listElement.innerHTML = '';
    this.layers.forEach((layer) => {
      const item = document.createElement('div');
      const isActive = layer.id === this.app.state.activeLayerId;
      
      item.className = `flex items-center gap-2 p-2 rounded text-xs cursor-pointer border select-none ${
        isActive
          ? 'bg-indigo-50 border-indigo-300'
          : 'bg-white border-transparent hover:bg-slate-50'
      }`;

      item.onclick = () => this.setActive(layer.id);

      item.innerHTML = `
        <button class="w-4 h-4 text-slate-400 hover:text-indigo-600" onclick="event.stopPropagation(); window.app.layers.toggleVisibility(${layer.id})">
          <i class="fas ${layer.visible ? 'fa-eye' : 'fa-eye-slash'}"></i>
        </button>
        <span class="flex-1 truncate font-medium ${
          isActive ? 'text-indigo-700' : 'text-slate-600'
        }">${layer.name}</span>
        ${isActive ? '<i class="fas fa-pen text-[10px] text-indigo-400"></i>' : ''}
      `;

      this.listElement.appendChild(item);
    });
  }

  /**
   * Update composite canvas with all visible layers
   */
  updateComposite() {
    this.compositeCtx.clearRect(0, 0, this.config.TEXTURE_SIZE, this.config.TEXTURE_SIZE);

    for (let i = this.layers.length - 1; i >= 0; i--) {
      if (this.layers[i].visible) {
        this.compositeCtx.drawImage(this.layers[i].canvas, 0, 0);
      }
    }

    if (this.app && this.app.viewer) {
      this.app.viewer.updateTexture(this.compositeCanvas);
    }
  }

  /**
   * Load base image into bottom layer
   */
  loadBaseImage(img) {
    const baseLayer = this.layers[this.layers.length - 1];
    baseLayer.ctx.clearRect(0, 0, this.config.TEXTURE_SIZE, this.config.TEXTURE_SIZE);
    baseLayer.ctx.drawImage(
      img,
      0,
      0,
      this.config.TEXTURE_SIZE,
      this.config.TEXTURE_SIZE
    );
    this.updateComposite();
    this.app.history.save();
  }
}
