import { createHytaleRigFromBB } from '../data/rigData.js';

/**
 * 3D Viewer - Renders the Hytale character model using Three.js
 */
export class Viewer3D {
  constructor(textureCanvas, containerId = 'viewer-3d', app = null) {
    this.app = app;
    this.container = document.getElementById(containerId);

    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf8fafc);

    // Camera setup
    const w = this.container.clientWidth || 320;
    const h = this.container.clientHeight || 320;

    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    this.camera.position.set(0, 70, 140);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);

    // Lighting
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    this.scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(80, 120, 60);
    this.scene.add(dir);

    // Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.target.set(0, 45, 0);

    // Rig + texture
    this.initModel(textureCanvas);

    // Painting helpers
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.isPainting3D = false;
    this.renderer.domElement.addEventListener('mousedown', (e) => this.handlePointerDown(e));
    window.addEventListener('mouseup', () => this.endPaintStroke());
    this.renderer.domElement.addEventListener('mousemove', (e) => {
      if (this.isPainting3D) this.handlePaintOnModel(e);
    });

    // Animation
    this.isSpinning = false;
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    window.addEventListener('resize', () => this.onResize());
  }

  /**
   * Setup rig and texture using the composite canvas
   */
  initModel(textureCanvas) {
    const canvas = textureCanvas || window?.app?.layers?.compositeCanvas;
    if (!canvas) return;

    this.texture = new THREE.CanvasTexture(canvas);
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.flipY = false;

    this.rigGroup = createHytaleRigFromBB(this.texture);
    this.scene.add(this.rigGroup);
  }

  /**
   * Toggle edge helpers to create a paint-friendly grid
   */
  togglePaintGrid() {
    if (!this.rigGroup) return;
    if (this.paintGridGroup) {
      this.scene.remove(this.paintGridGroup);
      this.paintGridGroup = null;
      return;
    }

    const group = new THREE.Group();
    this.rigGroup.children.forEach((mesh) => {
      const edges = new THREE.EdgesGeometry(mesh.geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x94a3b8, linewidth: 1, transparent: true, opacity: 0.35 })
      );
      line.position.copy(mesh.position);
      line.rotation.copy(mesh.rotation);
      group.add(line);
    });

    this.paintGridGroup = group;
    this.scene.add(group);
  }

  /**
   * Update texture from canvas
   */
  updateTexture() {
    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  }

  /**
   * Handle pointer down for 3D paint mode
   */
  handlePointerDown(event) {
    if (!this.app?.state.paintOn3D) return;
    this.isPainting3D = true;
    this.handlePaintOnModel(event);
  }

  handlePaintOnModel(event) {
    if (!this.app?.editor || !this.rigGroup) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.rigGroup.children, true);
    if (!intersects.length || !intersects[0].uv) return;

    const uv = intersects[0].uv;
    const canvas = this.app.layers.compositeCanvas;
    const x = Math.floor(uv.x * canvas.width);
    const y = Math.floor((1 - uv.y) * canvas.height);
    this.app.editor.paintAt(x, y, { commitHistory: false });
  }

  endPaintStroke() {
    if (this.isPainting3D) {
      this.isPainting3D = false;
      this.app?.history?.save();
    }
  }

  /**
   * Toggle auto-rotation
   */
  toggleSpin() {
    this.isSpinning = !this.isSpinning;
  }

  /**
   * Toggle grid display
   */
  toggleGrid() {
    if (this.grid) {
      this.scene.remove(this.grid);
      this.grid = null;
    } else {
      this.grid = new THREE.GridHelper(200, 20, 0xcccccc, 0xeeeeee);
      this.scene.add(this.grid);
    }
  }

  /**
   * Reset camera position
   */
  resetCamera() {
    this.controls.reset();
    this.camera.position.set(0, 70, 140);
    this.controls.target.set(0, 45, 0);
  }

  /**
   * Handle window resize
   */
  onResize() {
    const w = this.container.clientWidth || 320;
    const h = this.container.clientHeight || 320;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(this.animate);

    if (this.isSpinning) {
      this.rigGroup.rotation.y += 0.01;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
