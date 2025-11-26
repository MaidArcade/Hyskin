/**
 * Configuration constants for the application
 */
export const CONFIG = {
  TEXTURE_SIZE: 256,
  DEFAULT_TEXTURE_URL: '/assets/default-skin.png',
  BRUSH_MAX_SIZE: 32,
  HISTORY_LIMIT: 20,
  ZOOM_MIN: 0.5,
  ZOOM_MAX: 4.0,
  ZOOM_STEP: 0.1
};

/**
 * Initial application state
 */
export const getInitialState = () => ({
  tool: 'brush',
  color: '#ff0000',
  brushSize: 1,
  brushOpacity: 1,
  brushType: 'square',
  isDrawing: false,
  mirrorMode: false,
  zoom: 1.0,
  darkMode: false,
  selection: null,
  isPanning: false,
  activeLayerId: 0,
  layerCounter: 0,
  paintOn3D: false,
  viewMode: '2d'
});

/**
 * Default color palette
 */
export const DEFAULT_PALETTE = [
  '#000000',
  '#ffffff',
  '#ef4444',
  '#3b82f6',
  '#8d5524',
  '#e0ac69'
];

/**
 * Tool definitions
 */
export const TOOLS = {
  BRUSH: 'brush',
  ERASER: 'eraser',
  FILL: 'fill',
  PICKER: 'picker',
  SELECT: 'select',
  MOVE: 'move',
  ZOOM: 'zoom',
  HAND: 'hand'
};

/**
 * Keyboard shortcuts
 */
export const SHORTCUTS = {
  UNDO: { ctrl: true, key: 'z' },
  REDO: { ctrl: true, key: 'y' },
  BRUSH: 'b',
  ERASER: 'e',
  FILL: 'f',
  PICKER: 'p',
  SELECT: 'm',
  MOVE: 'v',
  ZOOM: 'z',
  HAND: ' ',
  ZOOM_IN: '+',
  ZOOM_OUT: '-'
};
