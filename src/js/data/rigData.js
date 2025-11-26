/**
 * Rig data and helpers to build the Hytale model directly from the HyRig3.bbmodel layout.
 */

export const RIG_DATA = {
  textureWidth: 256,
  textureHeight: 256,
  resolution: { width: 16, height: 16 },

  // Datos sacados 1:1 de HyRig3.bbmodel
  elements: [
    {
      name: "Pelvis",
      from: [-5, 38, 0],
      to: [21, 48, 18],
      size: [26, 10, 18],
      origin: [8, 43, 8],
      rotation: [0, 0, 0],
      faces: {
        north: [8.5, 5.8125, 10.125, 6.4375],
        east: [7.375, 5.8125, 8.5, 6.4375],
        south: [11.25, 5.8125, 12.875, 6.4375],
        west: [10.125, 5.8125, 11.25, 6.4375],
        up: [10.125, 5.8125, 8.5, 4.6875],
        down: [11.75, 4.6875, 10.125, 5.8125]
      }
    },
    {
      name: "Body",
      from: [-5, 48, 0],
      to: [21, 62, 18],
      size: [26, 14, 18],
      origin: [8, 55, 8],
      rotation: [0, 0, 0],
      faces: {
        north: [8.875, 4.4375, 10.5, 5.3125],
        east: [7.75, 4.4375, 8.875, 5.3125],
        south: [11.625, 4.4375, 13.25, 5.3125],
        west: [10.5, 4.4375, 11.625, 5.3125],
        up: [10.5, 4.4375, 8.875, 3.3125],
        down: [12.125, 3.3125, 10.5, 4.4375]
      }
    },
    {
      name: "Chest",
      from: [-6, 62, -1],
      to: [22, 84, 19],
      size: [28, 22, 20],
      origin: [8, 73, 8],
      rotation: [0, 0, 0],
      faces: {
        north: [8.75, 3.3125, 10.5, 4.6875],
        east: [7.5, 3.3125, 8.75, 4.6875],
        south: [11.75, 3.3125, 13.5, 4.6875],
        west: [10.5, 3.3125, 11.75, 4.6875],
        up: [10.5, 3.3125, 8.75, 2.0625],
        down: [12.25, 2.0625, 10.5, 3.3125]
      }
    },
    {
      name: "Neck",
      from: [0, 84, 3],
      to: [16, 92, 15],
      size: [16, 8, 12],
      origin: [8, 88, 9],
      rotation: [0, 0, 0],
      faces: {
        north: [4.1875, 1, 5.1875, 1.5],
        east: [4.1875, 1, 5.1875, 1.5],
        south: [4.1875, 1, 5.1875, 1.5],
        west: [4.1875, 1, 5.1875, 1.5],
        up: [4.1875, 1, 5.1875, 1.5],
        down: [4.1875, 1, 5.1875, 1.5]
      }
    },
    {
      name: "Head",
      from: [-6, 92, -7],
      to: [22, 120, 21],
      size: [28, 28, 28],
      origin: [8, 106, 7],
      rotation: [0, 0, 0],
      faces: {
        north: [1.9375, 2, 3.6875, 3.75],
        east: [0.1875, 2, 1.9375, 3.75],
        south: [5.4375, 2, 7.1875, 3.75],
        west: [3.6875, 2, 5.4375, 3.75],
        up: [3.6875, 2, 1.9375, 0.25],
        down: [5.4375, 0.25, 3.6875, 2]
      }
    },
    {
      name: "Mouth_Main",
      from: [0, 94, -7.1],
      to: [16, 101, -7.09],
      size: [16, 7, 0.01],
      origin: [8, 97.5, -7.1],
      rotation: [0, 0, 0],
      faces: {
        north: [3.8125, 4.5625, 4.8125, 4.9375],
        east: [3.8125, 4.5625, 4.8125, 4.9375],
        south: [3.8125, 4.5625, 4.8125, 4.9375],
        west: [3.8125, 4.5625, 4.8125, 4.9375],
        up: [3.8125, 4.5625, 4.8125, 4.9375],
        down: [3.8125, 4.5625, 4.8125, 4.9375]
      }
    },

    // --- CADERAS, PIERNAS y PIES ---

    {
      name: "Hip_Left",
      from: [-5, 33, 1],
      to: [7, 49, 15],
      size: [12, 16, 14],
      origin: [1, 41, 8],
      rotation: [0, 0, 0],
      faces: {
        north: [10.5, 6.4375, 11.25, 7.4375],
        east: [9.75, 6.4375, 10.5, 7.4375],
        south: [11.75, 6.4375, 12.5, 7.4375],
        west: [11, 6.4375, 11.75, 7.4375],
        up: [11, 6.4375, 10.25, 5.8125],
        down: [11.75, 5.8125, 11, 6.4375]
      }
    },
    {
      name: "Hip_Right",
      from: [9, 33, 1],
      to: [21, 49, 15],
      size: [12, 16, 14],
      origin: [15, 41, 8],
      rotation: [0, 0, 0],
      faces: {
        north: [10.5, 6.4375, 11.25, 7.4375],
        east: [9.75, 6.4375, 10.5, 7.4375],
        south: [11.75, 6.4375, 12.5, 7.4375],
        west: [11, 6.4375, 11.75, 7.4375],
        up: [11, 6.4375, 10.25, 5.8125],
        down: [11.75, 5.8125, 11, 6.4375]
      }
    },
    {
      name: "Leg_Right",
      from: [9, 5, 2],
      to: [19, 33, 14],
      size: [10, 28, 12],
      origin: [15, 19, 8],
      rotation: [0, 0, 0],
      faces: {
        north: [10, 7.1875, 10.625, 8.9375],
        east: [9.25, 7.1875, 10, 8.9375],
        south: [11.375, 7.1875, 12, 8.9375],
        west: [10.625, 7.1875, 11.375, 8.9375],
        up: [10.625, 7.1875, 10, 6.4375],
        down: [11.25, 6.4375, 10.625, 7.1875]
      }
    },
    {
      name: "Leg_Left",
      from: [-3, 5, 2],
      to: [7, 33, 14],
      size: [10, 28, 12],
      origin: [1, 19, 8],
      rotation: [0, 0, 0],
      faces: {
        north: [10, 7.1875, 10.625, 8.9375],
        east: [9.25, 7.1875, 10, 8.9375],
        south: [11.375, 7.1875, 12, 8.9375],
        west: [10.625, 7.1875, 11.375, 8.9375],
        up: [10.625, 7.1875, 10, 6.4375],
        down: [11.25, 6.4375, 10.625, 7.1875]
      }
    },
    {
      name: "Foot_Left",
      from: [-3.00883, 0.17883, -2.99619],
      to: [10.99117, 8.17883, 17.00381],
      size: [14, 8, 20],
      origin: [3.99117, 4.17883, 7.00381],
      rotation: [0, 0, 0],
      faces: {
        north: [6.5, 7, 5.625, 7.5],
        east: [7.75, 7, 6.5, 7.5],
        south: [8.625, 7, 7.75, 7.5],
        west: [5.625, 7, 4.375, 7.5],
        up: [5.625, 7, 6.5, 5.75],
        down: [6.5, 5.75, 7.375, 7]
      }
    },
    {
      name: "Foot_Right",
      from: [17.00883, 0.17883, -2.99619],
      to: [31.00883, 8.17883, 17.00381],
      size: [14, 8, 20],
      origin: [24.00883, 4.17883, 7.00381],
      rotation: [0, 0, 0],
      faces: {
        north: [6.5, 7, 5.625, 7.5],
        east: [7.75, 7, 6.5, 7.5],
        south: [8.625, 7, 7.75, 7.5],
        west: [5.625, 7, 4.375, 7.5],
        up: [5.625, 7, 6.5, 5.75],
        down: [6.5, 5.75, 7.375, 7]
      }
    },

    // --- Hombros / brazos (cajas externas del torso) ---
    {
      name: "Shoulder_Left_Top",
      from: [-10.9967, 73.37574, 2.01311],
      to: [-2.9967, 93.37574, 14.01311],
      size: [8, 20, 12],
      origin: [-6.9967, 83.37574, 8.01311],
      rotation: [0, 0, 0],
      faces: {
        north: [12.75, 2.25, 13.5, 3.25],
        east: [12.25, 2.25, 12.75, 3.25],
        south: [14, 2.25, 14.75, 3.25],
        west: [13.5, 2.25, 14, 3.25],
        up: [13.5, 2.25, 12.75, 1.75],
        down: [14.25, 1.75, 13.5, 2.25]
      }
    },
    {
      name: "Shoulder_Right_Top",
      from: [24, 73, 2],
      to: [32, 93, 14],
      size: [8, 20, 12],
      origin: [28, 83, 8],
      rotation: [0, 0, 0],
      faces: {
        north: [12.75, 2.25, 13.5, 3.25],
        east: [12.25, 2.25, 12.75, 3.25],
        south: [14, 2.25, 14.75, 3.25],
        west: [13.5, 2.25, 14, 3.25],
        up: [13.5, 2.25, 12.75, 1.75],
        down: [14.25, 1.75, 13.5, 2.25]
      }
    }

    // (… aquí seguirían el resto de cajas de hombros, brazos y orejas,
    //   con la misma estructura, pero la idea es siempre esta:
    //   from/to/origin/rotation + faces{north,east,south,west,up,down}
    //   usando los uv exactos del .bbmodel)

  ]
};

// ============================================
// Construcción del modelo 3D desde RIG_DATA
// ============================================

export function createHytaleRigFromBB(texture) {
  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.DoubleSide,
    transparent: true,
    alphaTest: 0.1
  });

  const group = new THREE.Group();

  RIG_DATA.elements.forEach((el) => {
    const mesh = createBBPart(el, mat);
    group.add(mesh);
  });

  // Centrado aproximado del muñeco
  group.position.set(-8, 0, -8);
  return group;
}

function createBBPart(el, material) {
  const [ox, oy, oz] = el.origin;
  const [rx, ry, rz] = el.rotation || [0, 0, 0];

  const positions = [];
  const uvs = [];

  const texW = RIG_DATA.resolution.width;
  const texH = RIG_DATA.resolution.height;

  function uvRectToCorners(rect) {
    const [u1, v1, u2, v2] = rect;
    const U1 = u1 / texW;
    const U2 = u2 / texW;
    const V1 = 1 - v1 / texH; // invertimos eje Y
    const V2 = 1 - v2 / texH;

    const tl = [U1, V1];
    const tr = [U2, V1];
    const bl = [U1, V2];
    const br = [U2, V2];
    return { tl, tr, bl, br };
  }

  function pushFace(faceName, corners) {
    const rect = el.faces[faceName];
    if (!rect) return;
    const { tl, tr, bl, br } = uvRectToCorners(rect);

    const [pTL, pTR, pBL, pBR] = corners;

    function addVertex(p, uv) {
      positions.push(p[0] - ox, p[1] - oy, p[2] - oz);
      uvs.push(uv[0], uv[1]);
    }

    // Triángulo 1: TL – BL – BR
    addVertex(pTL, tl);
    addVertex(pBL, bl);
    addVertex(pBR, br);

    // Triángulo 2: TL – BR – TR
    addVertex(pTL, tl);
    addVertex(pBR, br);
    addVertex(pTR, tr);
  }

  const [x1, y1, z1] = el.from;
  const [x2, y2, z2] = el.to;

  // north = -Z
  pushFace("north", [
    [x1, y2, z1],
    [x2, y2, z1],
    [x1, y1, z1],
    [x2, y1, z1]
  ]);

  // south = +Z
  pushFace("south", [
    [x2, y2, z2],
    [x1, y2, z2],
    [x2, y1, z2],
    [x1, y1, z2]
  ]);

  // east = +X
  pushFace("east", [
    [x2, y2, z1],
    [x2, y2, z2],
    [x2, y1, z1],
    [x2, y1, z2]
  ]);

  // west = -X
  pushFace("west", [
    [x1, y2, z2],
    [x1, y2, z1],
    [x1, y1, z2],
    [x1, y1, z1]
  ]);

  // up = +Y
  pushFace("up", [
    [x1, y2, z2],
    [x2, y2, z2],
    [x1, y2, z1],
    [x2, y2, z1]
  ]);

  // down = -Y
  pushFace("down", [
    [x1, y1, z1],
    [x2, y1, z1],
    [x1, y1, z2],
    [x2, y1, z2]
  ]);

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geom.computeVertexNormals();

  const mesh = new THREE.Mesh(geom, material);
  mesh.position.set(ox, oy, oz);
  mesh.rotation.set((rx * Math.PI) / 180, (ry * Math.PI) / 180, (rz * Math.PI) / 180);

  return mesh;
}
