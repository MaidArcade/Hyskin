/**
 * UI Manager - Handles all UI interactions and updates
 */
export class UIManager {
  constructor(app, config) {
    this.app = app;
    this.config = config;
    this.previousTool = null;
    this.setupColorPicker();
    this.setupSpectrum();
    this.setupTools();
    this.setupFile();
    this.setupThemeToggle();
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
   * Full spectrum canvas picker
   */
  setupSpectrum() {
    const canvas = document.getElementById('color-spectrum');
    const ctx = canvas.getContext('2d');

    const drawSpectrum = () => {
      const gradientX = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradientX.addColorStop(0, 'red');
      gradientX.addColorStop(0.16, 'orange');
      gradientX.addColorStop(0.33, 'yellow');
      gradientX.addColorStop(0.5, 'green');
      gradientX.addColorStop(0.66, 'cyan');
      gradientX.addColorStop(0.83, 'blue');
      gradientX.addColorStop(1, 'magenta');
      ctx.fillStyle = gradientX;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradientY = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradientY.addColorStop(0, 'rgba(255,255,255,0.8)');
      gradientY.addColorStop(0.5, 'rgba(255,255,255,0)');
      gradientY.addColorStop(1, 'rgba(0,0,0,0.7)');
      ctx.fillStyle = gradientY;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    drawSpectrum();

    const pick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.min(canvas.width, Math.max(0, e.clientX - rect.left));
      const y = Math.min(canvas.height, Math.max(0, e.clientY - rect.top));
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex =
        '#' + ('000000' + ((pixel[0] << 16) | (pixel[1] << 8) | pixel[2]).toString(16)).slice(-6);
      this.setColor(hex);
    };

    canvas.addEventListener('mousedown', (e) => {
      pick(e);
      const move = (ev) => pick(ev);
      const up = () => {
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
      };
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
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
    document.getElementById('tool-select').onclick = () => setTool('select');
    document.getElementById('tool-move').onclick = () => setTool('move');
    document.getElementById('tool-zoom').onclick = () => setTool('zoom');
    document.getElementById('tool-hand').onclick = () => setTool('hand');

    document.getElementById('brush-size').addEventListener('input', (e) => {
      this.app.state.brushSize = e.target.value;
      document.getElementById('brush-size-val').innerText = this.app.state.brushSize;
    });

    document.getElementById('brush-opacity').addEventListener('input', (e) => {
      this.app.state.brushOpacity = parseFloat(e.target.value);
      document.getElementById('brush-opacity-val').innerText =
        Math.round(this.app.state.brushOpacity * 100) + '%';
    });

    document.querySelectorAll('.brush-type').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.app.state.brushType = btn.dataset.type;
        document.querySelectorAll('.brush-type').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    document.querySelector('.brush-type[data-type="square"]').classList.add('active');

    document.getElementById('mirror-mode').onclick = function () {
      this.app.state.mirrorMode = !this.app.state.mirrorMode;
      this.classList.toggle('bg-indigo-100', this.app.state.mirrorMode);
      this.classList.toggle('text-indigo-700', this.app.state.mirrorMode);
    }.bind(this);

    document.getElementById('swap-views').onclick = () => {
      this.app.state.viewMode = this.app.state.viewMode === '2d' ? '3d' : '2d';
      this.updateViewMode();
    };

    document.getElementById('toggle-3d-paint').onclick = (e) => {
      this.app.state.paintOn3D = !this.app.state.paintOn3D;
      e.currentTarget.classList.toggle('bg-indigo-600', this.app.state.paintOn3D);
      e.currentTarget.classList.toggle('text-white', this.app.state.paintOn3D);
      e.currentTarget.classList.toggle('ring-2', this.app.state.paintOn3D);
      e.currentTarget.classList.toggle('ring-indigo-200', this.app.state.paintOn3D);
    };

    this.setupKeyboardShortcuts();
    this.updateViewMode();
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
      } else if (e.key === 'm') {
        this.app.state.tool = 'select';
        this.updateTools();
      } else if (e.key === 'v') {
        this.app.state.tool = 'move';
        this.updateTools();
      } else if (e.key === 'z' && !e.ctrlKey) {
        this.app.state.tool = 'zoom';
        this.updateTools();
      } else if (e.key === ' ') {
        if (!this.app.state.isPanning) {
          this.previousTool = this.app.state.tool;
          this.app.state.tool = 'hand';
        }
        this.app.state.isPanning = true;
        this.updateTools();
      }

      if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        this.app.editor.zoom(this.config.ZOOM_STEP);
      }

      if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        this.app.editor.zoom(-this.config.ZOOM_STEP);
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === ' ' && this.app.state.tool === 'hand') {
        this.app.state.isPanning = false;
        if (this.previousTool) {
          this.app.state.tool = this.previousTool;
          this.previousTool = null;
        }
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
   * Apply current layout based on view mode
   */
  updateViewMode() {
    const is3D = this.app.state.viewMode === '3d';
    document.body.classList.toggle('swap-layout', is3D);
    document.body.classList.toggle('view-3d-only', is3D);
    const label = document.getElementById('swap-views-label');
    if (label) {
      label.innerText = is3D ? 'Ir a 2D' : 'Intercambiar 2D/3D';
    }
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

  /**
   * Setup theme toggle and respond to dark mode
   */
  setupThemeToggle() {
    const btn = document.getElementById('toggle-theme');
    if (!btn) return;
    const apply = () => {
      document.documentElement.classList.toggle('dark', this.app.state.darkMode);
      btn.innerHTML = this.app.state.darkMode
        ? '<i class="fas fa-sun"></i> Claro'
        : '<i class="fas fa-moon"></i> Oscuro';
      if (this.app.viewer?.scene) {
        this.app.viewer.scene.background = new THREE.Color(this.app.state.darkMode ? 0x0f172a : 0xf8fafc);
      }
    };

    btn.addEventListener('click', () => {
      this.app.state.darkMode = !this.app.state.darkMode;
      apply();
    });

    apply();
  }
}
