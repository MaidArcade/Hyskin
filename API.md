# API Documentation

## Core Classes

### App
Main application controller that initializes all managers.

```javascript
new App()
```

**Properties:**
- `config` - Configuration constants
- `state` - Application state object
- `history` - HistoryManager instance
- `layers` - LayerManager instance
- `ui` - UIManager instance
- `ai` - AIManager instance
- `editor` - Editor2D instance
- `viewer` - Viewer3D instance

**Methods:**
- `exportSkin()` - Download current skin as PNG
- `saveToCloud()` - Placeholder for cloud saving

---

## Managers

### HistoryManager
Handles undo/redo functionality.

```javascript
app.history.save()      // Save current state
app.history.undo()      // Undo last action
app.history.redo()      // Redo last undo
```

**Properties:**
- `stack` - Array of history states
- `pointer` - Current position in history
- `limit` - Maximum history size (20)

---

### LayerManager
Manages layer composition and visibility.

```javascript
app.layers.addLayer("Name")           // Create new layer
app.layers.setActive(id)              // Set active layer
app.layers.getActive()                // Get active layer
app.layers.toggleVisibility(id)       // Toggle layer visibility
app.layers.loadBaseImage(image)       // Load background image
app.layers.updateComposite()          // Refresh composite canvas
```

**Properties:**
- `layers` - Array of layer objects
- `compositeCanvas` - Merged canvas
- `compositeCtx` - Canvas context

**Layer Structure:**
```javascript
{
  id: number,           // Unique identifier
  name: string,         // Layer name
  canvas: HTMLCanvas,   // Layer canvas
  visible: boolean,     // Visibility flag
  ctx: CanvasContext    // Canvas context
}
```

---

### UIManager
Handles all user interface interactions.

```javascript
app.ui.updatePalette(colors)          // Update color swatches
app.ui.setColor(hex)                  // Set current color
app.ui.updateTools()                  // Update tool buttons
app.ui.newFile()                      // Create new document
app.ui.loadFile(file)                 // Load PNG file
```

**Properties:**
- `app` - Reference to main app
- `config` - Configuration reference

---

### AIManager
Integrates with Google Gemini API.

```javascript
app.ai.toggleModal()                  // Show/hide AI modal
app.ai.setTab(tab)                    // Switch AI tabs
app.ai.generatePalette()              // Generate color palette
app.ai.analyzeSkin()                  // Analyze current skin
app.ai.callGemini(prompt, image)      // Raw API call
```

**Properties:**
- `apiKey` - Gemini API key
- `currentTab` - Active tab ('palette' or 'critic')

**Requirements:**
- `GEMINI_API_KEY` environment variable set

---

## Editors

### Editor2D
2D pixel art canvas editor.

```javascript
app.editor.paint(event)               // Paint on canvas
app.editor.zoom(delta)                // Zoom in/out
app.editor.getCoords(event)           // Get canvas coordinates
```

**Supported Tools:**
- `brush` - Paint with color
- `eraser` - Remove pixels
- `fill` - Fill entire canvas
- `picker` - Sample color

**Keyboard Shortcuts:**
- **B** - Brush
- **E** - Eraser
- **F** - Fill
- **P** - Picker
- **Ctrl+Z** - Undo
- **Ctrl+Y** - Redo

---

## Viewers

### Viewer3D
3D character model preview using Three.js.

```javascript
app.viewer.toggleSpin()               // Auto-rotate toggle
app.viewer.toggleGrid()               // Grid toggle
app.viewer.resetCamera()              // Reset camera position
app.viewer.updateTexture(canvas)      // Update texture
```

**Features:**
- Real-time texture updates
- OrbitControls camera
- HemisphereLight + DirectionalLight
- MeshStandardMaterial

**Controls:**
- Click + drag - Rotate
- Scroll - Zoom
- Buttons - Grid, Reset, Spin

---

## State Management

### Global State
Located in `src/js/config/constants.js`

```javascript
{
  tool: 'brush',           // Current tool
  color: '#ff0000',        // Current color
  brushSize: 1,            // Brush size (1-10)
  isDrawing: false,        // Drawing state
  mirrorMode: false,       // Mirror mode state
  zoom: 1.0,               // Zoom level
  activeLayerId: 0,        // Active layer ID
  layerCounter: 0          // Layer ID counter
}
```

### Configuration
Located in `src/js/config/constants.js`

```javascript
{
  TEXTURE_SIZE: 256,       // Canvas size
  BRUSH_MAX_SIZE: 10,      // Max brush size
  HISTORY_LIMIT: 20,       // Undo states
  ZOOM_MIN: 0.5,           // Min zoom
  ZOOM_MAX: 4.0            // Max zoom
}
```

---

## Data Structures

### RIG_DATA
Character model definition with UV coordinates.

```javascript
{
  resolution: 16,          // UV grid resolution
  parts: [
    {
      name: string,        // Part name
      size: [w, h, d],     // Part dimensions
      pos: [x, y, z],      // Position
      faces: {             // UV coordinates per face
        north: [u1, v1, u2, v2],
        south: [u1, v1, u2, v2],
        east: [u1, v1, u2, v2],
        west: [u1, v1, u2, v2],
        up: [u1, v1, u2, v2],
        down: [u1, v1, u2, v2]
      }
    }
  ]
}
```

---

## Event System

### Custom Events
The application uses standard DOM events:

- `mousedown` / `mouseup` / `mousemove` - Drawing
- `touchstart` / `touchend` / `touchmove` - Touch support
- `keydown` - Keyboard shortcuts
- `dragover` / `drop` - File drag-and-drop

### Binding Events
Events are bound in manager constructors:

```javascript
canvas.addEventListener('mousedown', this.startDrawing.bind(this));
window.addEventListener('keydown', this.handleKeyboard.bind(this));
```

---

## API Endpoints

### Local Server Routes

**GET** `/`
- Returns index.html

**GET** `/api/health`
- Returns: `{ status: 'ok', message: '...' }`

**GET** `/api/config`
- Returns: `{ apiKey: 'configured' | 'not-configured' }`

---

## Error Handling

### Try-Catch Pattern
```javascript
try {
  const result = await api.call();
} catch (error) {
  console.error('Error:', error);
  ui.showError(error.message);
}
```

### Validation
```javascript
if (!file.type.match('image.*')) {
  alert('Solo imágenes PNG');
  return;
}
```

---

## Performance Considerations

### Memory
- Canvas: 256x256 × 4 bytes × number of layers = memory
- History: Each state = 256KB × layers
- Default: ~50MB for 20 states with 10 layers

### Rendering
- 3D: 60 FPS target with requestAnimationFrame
- Canvas: Pixel-perfect rendering with image-rendering CSS
- Composite: Rebuilt on every change

### Optimization Tips
- Limit layers to 10-15
- Clear history between sessions
- Use reasonable brush sizes
- Export skins to free memory

---

## Extending the Application

### Adding a New Tool
1. Add to TOOLS constant
2. Implement in Editor2D.paint()
3. Add UI button
4. Bind in UIManager

### Adding a New Manager
1. Create class extending from base
2. Register in App constructor
3. Add to global window.app
4. Export from module

### Adding API Integration
1. Extend AIManager
2. Add error handling
3. Implement loading states
4. Add to UI

---

## Resources

- **Three.js Documentation**: https://threejs.org/docs/
- **Google Gemini API**: https://ai.google.dev/
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **JavaScript Modules**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
