/**
 * UI Manager - Handles all UI interactions and updates
 */
export class UIManager {
  constructor(app, config) {
    this.app = app;
    this.config = config;
    this.setupColorPicker();
    this.setupTools();
    this.setupFile();
    this.updatePalette(this.app.DEFAULT_PALETTE);
  }

  /**
   * Setup color picker input
   */
  setupColorPicker() {
    const input = document.getElementById('main-color');
    input.addEventListener('input', (e) => {
      this.app.state.color = e.target.value;
    });
  }

  /**
   * Update color palette grid
   */
  updatePalette(colors) {
    const grid = document.getElementById('palette-grid');
    grid.innerHTML = '';

    colors.forEach((color) => {
      const el = document.createElement('div');
      el.className = 'w-6 h-6 rounded cursor-pointer palette-swatch border border-slate-200';
      el.style.backgroundColor = color;
      el.dataset.color = color;
      el.onclick = () => {
        this.app.state.color = color;
        document.getElementById('main-color').value = color;
      };
      grid.appendChild(el);
    });
  }

  /**
   * Setup tool buttons
   */
  setupTools() {
    const setTool = (t) => {
      this.app.state.tool = t;
      this.updateTools();
    };

    document.getElementById('tool-brush').onclick = () => setTool('brush');
    document.getElementById('tool-eraser').onclick = () => setTool('eraser');
    document.getElementById('tool-fill').onclick = () => setTool('fill');
    document.getElementById('tool-picker').onclick = () => setTool('picker');

    document.getElementById('brush-size').addEventListener('input', (e) => {
      this.app.state.brushSize = e.target.value;
      document.getElementById('brush-size-val').innerText = this.app.state.brushSize;
    });

    document.getElementById('mirror-mode').onclick = function () {
      this.app.state.mirrorMode = !this.app.state.mirrorMode;
      this.classList.toggle('bg-indigo-100', this.app.state.mirrorMode);
      this.classList.toggle('text-indigo-700', this.app.state.mirrorMode);
    }.bind(this);

    this.setupKeyboardShortcuts();
  }

  /**
   * Setup keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'z') {
        this.app.history.undo();
      } else if (e.ctrlKey && e.key === 'y') {
        this.app.history.redo();
      } else if (e.key === 'b') {
        this.app.state.tool = 'brush';
        this.updateTools();
      } else if (e.key === 'e') {
        this.app.state.tool = 'eraser';
        this.updateTools();
      } else if (e.key === 'f') {
        this.app.state.tool = 'fill';
        this.updateTools();
      } else if (e.key === 'p') {
        this.app.state.tool = 'picker';
        this.updateTools();
      }
    });
  }

  /**
   * Update tool button active states
   */
  updateTools() {
    document.querySelectorAll('.tool-btn').forEach((b) => b.classList.remove('active'));
    document.getElementById(`tool-${this.app.state.tool}`).classList.add('active');
  }

  /**
   * Setup file input and drag/drop
   */
  setupFile() {
    const input = document.getElementById('file-upload');
    input.onchange = (e) => {
      if (e.target.files[0]) this.loadFile(e.target.files[0]);
    };

    const dropZone = document.getElementById('drop-zone');

    document.body.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.remove('hidden');
    });

    document.body.addEventListener('dragleave', (e) => {
      if (e.clientX === 0) dropZone.classList.add('hidden');
    });

    document.body.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.add('hidden');
      if (e.dataTransfer.files[0]) this.loadFile(e.dataTransfer.files[0]);
    });
  }

  /**
   * Load image file
   */
  loadFile(file) {
    if (!file.type.match('image.*')) {
      return alert('Solo imágenes PNG');
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (img.width !== 256 || img.height !== 256) {
          alert('Aviso: La imagen no es 256x256. Puede verse mal.');
        }
        this.app.layers.loadBaseImage(img);
        document.getElementById('status-msg').innerText = 'Archivo cargado: ' + file.name;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  /**
   * Set color value
   */
  setColor(hex) {
    this.app.state.color = hex;
    document.getElementById('main-color').value = hex;
  }

  /**
   * Create new file
   */
  newFile() {
    if (confirm('¿Borrar todo y empezar de nuevo?')) {
      location.reload();
    }
  }
}
