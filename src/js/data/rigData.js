/**
 * Rig data and helpers to build the Hytale model directly from the HyRig3.bbmodel layout.
 */

export const RIG_DATA = {
  textureWidth: 256,
  textureHeight: 256,
  textureResolution: 16,

  parts: [
    {
      name: "Pelvis",
      size: [26, 10, 18],
      pos: [-1.149, -9.589, 1.05],
      faces: {
        north: [8.5, 5.812, 10.125, 6.438],
        east: [7.375, 5.812, 8.5, 6.438],
        south: [11.25, 5.812, 12.875, 6.438],
        west: [10.125, 5.812, 11.25, 6.438],
        up: [10.125, 5.812, 8.5, 4.688],
        down: [11.75, 4.688, 10.125, 5.812],
      },
    },
    {
      name: "Body",
      size: [26, 14, 18],
      pos: [-1.149, 2.411, 1.05],
      faces: {
        north: [4.125, 4.875, 5.75, 5.75],
        east: [3, 4.875, 4.125, 5.75],
        south: [6.875, 4.875, 8.5, 5.75],
        west: [5.75, 4.875, 6.875, 5.75],
        up: [5.75, 4.875, 4.125, 3.75],
        down: [7.375, 3.75, 5.75, 4.875],
      },
    },
    {
      name: "Chest",
      size: [28, 22, 20],
      pos: [-1.149, 20.411, 1.05],
      faces: {
        north: [8.75, 3.313, 10.5, 4.688],
        east: [7.5, 3.313, 8.75, 4.688],
        south: [11.75, 3.313, 13.5, 4.688],
        west: [10.5, 3.313, 11.75, 4.688],
        up: [10.5, 3.313, 8.75, 2.063],
        down: [12.25, 2.063, 10.5, 3.313],
      },
    },
    {
      name: "Neck",
      size: [16, 8, 12],
      pos: [-1.149, 34.411, 1.05],
      faces: {
        north: [4.25, 3.375, 5.25, 3.875],
        east: [3.5, 3.375, 4.25, 3.875],
        south: [6, 3.375, 7, 3.875],
        west: [5.25, 3.375, 6, 3.875],
        up: [5.25, 3.375, 4.25, 2.625],
        down: [6.25, 2.625, 5.25, 3.375],
      },
    },
    {
      name: "Head",
      size: [28, 28, 28],
      pos: [-1.149, 48.411, 0.05],
      faces: {
        north: [1.938, 2, 3.688, 3.75],
        east: [0.188, 2, 1.938, 3.75],
        south: [5.438, 2, 7.188, 3.75],
        west: [3.688, 2, 5.438, 3.75],
        up: [3.688, 2, 1.938, 0.25],
        down: [5.438, 0.25, 3.688, 2],
      },
    },
    {
      name: "Mouth",
      size: [16, 7, 0.1],
      pos: [-1.149, 38.411, -14.05],
      faces: {
        north: [0.125, 3.813, 1.125, 4.25],
        east: [0.125, 6, 0.125, 6.438],
        south: [1.125, 6, 2.125, 6.438],
        west: [1.125, 6, 1.125, 6.438],
        up: [1.125, 6, 0.125, 6],
        down: [2.125, 6, 1.125, 6],
      },
    },
    {
      name: "Hip_Left",
      size: [12, 16, 14],
      pos: [-8.149, -21.589, 1.05],
      faces: {
        north: [9.375, 5.688, 10.125, 6.5],
        east: [8.5, 5.688, 9.375, 6.5],
        south: [11.25, 5.688, 12, 6.5],
        west: [10.125, 5.688, 11.25, 6.5],
        up: [10.125, 5.688, 9.375, 4.813],
        down: [10.875, 4.813, 10.125, 5.688],
      },
    },
    {
      name: "Hip_Right",
      size: [12, 16, 14],
      pos: [5.851, -21.589, 1.05],
      faces: {
        north: [7.625, 5.688, 8.375, 6.5],
        east: [6.75, 5.688, 7.625, 6.5],
        south: [9.5, 5.688, 10.25, 6.5],
        west: [8.375, 5.688, 9.5, 6.5],
        up: [8.375, 5.688, 7.625, 4.813],
        down: [9.125, 4.813, 8.375, 5.688],
      },
    },
    {
      name: "Leg_Right_Upper",
      size: [10, 28, 12],
      pos: [5.851, -43.589, 1.05],
      faces: {
        north: [10, 7.188, 10.625, 8.938],
        east: [9.25, 7.188, 10, 8.938],
        south: [11.375, 7.188, 12, 8.938],
        west: [10.625, 7.188, 11.375, 8.938],
        up: [10.625, 7.188, 10, 6.438],
        down: [11.25, 6.438, 10.625, 7.188],
      },
    },
    {
      name: "Leg_Left_Upper",
      size: [10, 28, 12],
      pos: [-8.149, -43.589, 1.05],
      faces: {
        north: [8.625, 7.188, 9.25, 8.938],
        east: [7.875, 7.188, 8.625, 8.938],
        south: [10, 7.188, 10.625, 8.938],
        west: [9.25, 7.188, 10, 8.938],
        up: [9.25, 7.188, 8.625, 6.438],
        down: [9.875, 6.438, 9.25, 7.188],
      },
    },
    {
      name: "Foot_Left",
      size: [14, 8, 20],
      pos: [-12.158, -58.411, 0.054],
      faces: {
        north: [5.625, 7, 6.5, 7.5],
        east: [4.375, 7, 5.625, 7.5],
        south: [7.75, 7, 8.625, 7.5],
        west: [6.5, 7, 7.75, 7.5],
        up: [6.5, 7, 5.625, 5.75],
        down: [7.375, 5.75, 6.5, 7],
      },
    },
    {
      name: "Foot_Right",
      size: [14, 8, 20],
      pos: [9.86, -58.411, 0.054],
      faces: {
        north: [4.375, 7, 5.25, 7.5],
        east: [3.125, 7, 4.375, 7.5],
        south: [6.5, 7, 7.375, 7.5],
        west: [5.25, 7, 6.5, 7.5],
        up: [5.25, 7, 4.375, 5.75],
        down: [6.125, 5.75, 5.25, 7],
      },
    },
    {
      name: "Arm_Left",
      size: [8, 20, 12],
      pos: [-16.146, 20.786, 1.063],
      faces: {
        north: [14, 2.75, 14.5, 4],
        east: [13.5, 2.75, 14, 4],
        south: [15, 2.75, 15.5, 4],
        west: [14.5, 2.75, 15, 4],
        up: [14.5, 2.75, 14, 2.25],
        down: [15, 2.25, 14.5, 2.75],
      },
    },
    {
      name: "Arm_Right",
      size: [8, 20, 12],
      pos: [13.851, 20.411, 1.05],
      faces: {
        north: [12, 2.75, 12.5, 4],
        east: [11.5, 2.75, 12, 4],
        south: [13, 2.75, 13.5, 4],
        west: [12.5, 2.75, 13, 4],
        up: [12.5, 2.75, 12, 2.25],
        down: [13, 2.25, 12.5, 2.75],
      },
    },
    {
      name: "Forearm_Right",
      size: [8, 16, 12],
      pos: [15.126, 4.097, 2.444],
      faces: {
        north: [12.5, 4.625, 13, 5.625],
        east: [12, 4.625, 12.5, 5.625],
        south: [13.5, 4.625, 14, 5.625],
        west: [13, 4.625, 13.5, 5.625],
        up: [13, 4.625, 12.5, 4.125],
        down: [13.5, 4.125, 13, 4.625],
      },
    },
    {
      name: "Forearm_Left",
      size: [8, 16, 12],
      pos: [-17.477, 3.456, 2.446],
      faces: {
        north: [14, 4.625, 14.5, 5.625],
        east: [13.5, 4.625, 14, 5.625],
        south: [15, 4.625, 15.5, 5.625],
        west: [14.5, 4.625, 15, 5.625],
        up: [14.5, 4.625, 14, 4.125],
        down: [15, 4.125, 14.5, 4.625],
      },
    },
    {
      name: "Hand_Left",
      size: [10, 12, 14],
      pos: [-15.188, -10.073, 0.714],
      faces: {
        north: [13.5, 5.625, 14.125, 6.625],
        east: [12.75, 5.625, 13.5, 6.625],
        south: [14.75, 5.625, 15.375, 6.625],
        west: [14.125, 5.625, 14.75, 6.625],
        up: [14.125, 5.625, 13.5, 4.875],
        down: [14.75, 4.875, 14.125, 5.625],
      },
    },
    {
      name: "Hand_Right",
      size: [10, 12, 14],
      pos: [16.477, -9.435, 1.073],
      faces: {
        north: [11.375, 5.625, 12, 6.625],
        east: [10.625, 5.625, 11.375, 6.625],
        south: [13.25, 5.625, 13.875, 6.625],
        west: [12, 5.625, 12.75, 6.625],
        up: [12, 5.625, 11.375, 4.875],
        down: [12.625, 4.875, 12, 5.625],
      },
    },
    {
      name: "Ear_Right",
      size: [4, 9, 4],
      pos: [14.351, 45.911, 1.05],
      faces: {
        north: [6.813, 1.313, 7.063, 1.875],
        east: [6.563, 1.313, 6.813, 1.875],
        south: [7.313, 1.313, 7.563, 1.875],
        west: [7.063, 1.313, 7.313, 1.875],
        up: [7.063, 1.313, 6.813, 1.063],
        down: [7.313, 1.063, 7.063, 1.313],
      },
    },
    {
      name: "Ear_Left",
      size: [4, 9, 4],
      pos: [-16.649, 45.911, 1.05],
      faces: {
        north: [6.813, 1.938, 7.063, 2.5],
        east: [6.563, 1.938, 6.813, 2.5],
        south: [7.313, 1.938, 7.563, 2.5],
        west: [7.063, 1.938, 7.313, 2.5],
        up: [7.063, 1.938, 6.813, 1.688],
        down: [7.313, 1.688, 7.063, 1.938],
      },
    },
  ],
};

// ============================================
// Construcción del modelo 3D desde RIG_DATA
// ============================================

export function createHytaleRigFromBB(texture) {
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.FrontSide,
    transparent: true,
    alphaTest: 0.1,
  });

  const group = new THREE.Group();
  const res = RIG_DATA.textureResolution;

  const setFaceUV = (geom, faceIndex, uvRect) => {
    if (!uvRect) return;
    const [uMin, vMin, uMax, vMax] = uvRect;

    const u0 = uMin / res;
    const u1 = uMax / res;
    const v0 = 1 - vMax / res;
    const v1 = 1 - vMin / res;

    const uv = geom.attributes.uv;
    const offset = faceIndex * 4;

    uv.setXY(offset + 0, u0, v1);
    uv.setXY(offset + 1, u1, v1);
    uv.setXY(offset + 2, u0, v0);
    uv.setXY(offset + 3, u1, v0);
  };

  RIG_DATA.parts.forEach((part) => {
    const [w, h, d] = part.size;
    const geom = new THREE.BoxGeometry(w, h, d);

    setFaceUV(geom, 0, part.faces.east);
    setFaceUV(geom, 1, part.faces.west);
    setFaceUV(geom, 2, part.faces.up);
    setFaceUV(geom, 3, part.faces.down);
    setFaceUV(geom, 4, part.faces.south);
    setFaceUV(geom, 5, part.faces.north);

    geom.attributes.uv.needsUpdate = true;

    const mesh = new THREE.Mesh(geom, material);
    mesh.position.set(part.pos[0], part.pos[1], part.pos[2]);
    group.add(mesh);
  });

  return group;
}
