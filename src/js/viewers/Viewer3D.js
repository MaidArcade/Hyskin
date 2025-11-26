import { createHytaleRigFromBB } from '../data/rigData.js';

/**
 * 3D Viewer - Renders the Hytale character model using Three.js
 */
export class Viewer3D {
  constructor(textureCanvas, containerId = 'viewer-3d') {
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
   * Update texture from canvas
   */
  updateTexture() {
    if (this.texture) {
      this.texture.needsUpdate = true;
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
