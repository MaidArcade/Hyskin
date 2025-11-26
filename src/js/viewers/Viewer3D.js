/**
 * 3D Viewer - Renders the Hytale character model using Three.js
 */
export class Viewer3D {
  constructor(textureCanvas, rigData, containerId = 'viewer-3d') {
    this.rigData = rigData;
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

    // Texture setup
    this.texture = new THREE.CanvasTexture(textureCanvas);
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.flipY = false;

    // Material setup
    this.material = new THREE.MeshStandardMaterial({
      map: this.texture,
      roughness: 0.6,
      metalness: 0.1,
      transparent: true,
      alphaTest: 0.05
    });

    // Rig group
    this.rigGroup = new THREE.Group();
    this.scene.add(this.rigGroup);

    this.buildRig();

    // Animation
    this.isSpinning = false;
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    window.addEventListener('resize', () => this.onResize());
  }

  /**
   * Build the character rig
   */
  buildRig() {
    this.rigData.parts.forEach((part) => {
      this.createPart(part);
    });
  }

  /**
   * Create a single rig part
   */
  createPart(data) {
    const w = data.size[0] || 0.01;
    const h = data.size[1] || 0.01;
    const d = data.size[2] || 0.01;

    const geometry = new THREE.BoxGeometry(w, h, d);
    const uvAttr = geometry.attributes.uv;

    const setUV = (faceIdx, uvArray) => {
      const [uMin, vMin, uMax, vMax] = uvArray;

      const u0 = uMin / this.rigData.resolution;
      const u1 = uMax / this.rigData.resolution;
      const v0 = 1 - vMax / this.rigData.resolution;
      const v1 = 1 - vMin / this.rigData.resolution;

      const o = faceIdx * 4;
      uvAttr.setXY(o + 0, u0, v1);
      uvAttr.setXY(o + 1, u1, v1);
      uvAttr.setXY(o + 2, u0, v0);
      uvAttr.setXY(o + 3, u1, v0);
    };

    // Map faces correctly
    setUV(0, data.faces.east);
    setUV(1, data.faces.west);
    setUV(2, data.faces.up);
    setUV(3, data.faces.down);
    setUV(4, data.faces.south);
    setUV(5, data.faces.north);

    geometry.attributes.uv.needsUpdate = true;

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
    this.rigGroup.add(mesh);
  }

  /**
   * Update texture from canvas
   */
  updateTexture(canvas) {
    this.texture.image = canvas;
    this.texture.needsUpdate = true;
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
