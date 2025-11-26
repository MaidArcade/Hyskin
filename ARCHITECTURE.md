```
HYTALE SKINFORGE - ARQUITECTURA DEL PROYECTO
═════════════════════════════════════════════════════════════════

🏗️ ESTRUCTURA COMPLETA

.
├── 📄 README.md                      ← Documentación principal
├── 📄 QUICKSTART.md                  ← Guía de inicio rápido
├── 📄 DEVELOPMENT.md                 ← Guía de desarrollo
├── 📄 API.md                         ← Documentación de API
├── 📄 CHANGELOG.md                   ← Historial de cambios
├── 📄 package.json                   ← Dependencias y scripts
├── 📄 server.js                      ← Servidor Express
├── 📄 build.js                       ← Script de compilación
├── 📄 eslint.config.js              ← Configuración ESLint
├── 📄 .prettierrc                    ← Configuración Prettier
├── 📄 .env.example                   ← Template de variables
├── 📄 .env.development               ← Configuración desarrollo
├── 📄 .gitignore                     ← Git ignore
│
├── 📁 public/
│   └── 📄 index.html                 ← Punto de entrada HTML
│
├── 📁 src/
│   ├── 📁 js/
│   │   ├── 📄 app.js                 ← Aplicación principal
│   │   │
│   │   ├── 📁 config/
│   │   │   └── 📄 constants.js       ← Constantes globales
│   │   │
│   │   ├── 📁 data/
│   │   │   └── 📄 rigData.js         ← Definición del rig
│   │   │
│   │   ├── 📁 managers/
│   │   │   ├── 📄 AIManager.js       ← Gemini API
│   │   │   ├── 📄 HistoryManager.js  ← Undo/Redo
│   │   │   ├── 📄 LayerManager.js    ← Gestión de capas
│   │   │   └── 📄 UIManager.js       ← Interfaz de usuario
│   │   │
│   │   ├── 📁 editors/
│   │   │   └── 📄 Editor2D.js        ← Editor 2D
│   │   │
│   │   └── 📁 viewers/
│   │       └── 📄 Viewer3D.js        ← Vista 3D
│   │
│   ├── 📁 css/
│   │   └── 📄 styles.css             ← Estilos CSS
│   │
│   └── 📁 assets/
│       └── (Imágenes, fuentes, etc.)
│
└── 📁 config/
    └── 📄 app.config.json            ← Configuración de app

════════════════════════════════════════════════════════════════

📊 FLUJO DE LA APLICACIÓN

1. INICIALIZACIÓN
   ↓
   index.html carga
   ↓
   Importa src/js/app.js (módulo ES6)
   ↓
   App constructor inicializa managers
   ↓
   Se crea la interfaz en el DOM

2. INTERACCIÓN DEL USUARIO
   ↓
   Usuario hace clic/dibuja
   ↓
   UIManager captura evento
   ↓
   Editor2D procesa el dibujo
   ↓
   LayerManager actualiza la capa
   ↓
   Viewer3D refleja cambios en 3D
   ↓
   HistoryManager guarda estado

3. FLUJO DE IA
   ↓
   Usuario ingresa prompt
   ↓
   AIManager prepara solicitud
   ↓
   Google Gemini API responde
   ↓
   UIManager muestra resultados
   ↓
   LayerManager aplica cambios

════════════════════════════════════════════════════════════════

🔄 CONEXIONES ENTRE COMPONENTES

App (Principal)
├─→ HistoryManager (Undo/Redo)
├─→ LayerManager (Capas)
│   ├─→ Viewer3D (Actualiza textura)
│   └─→ CompositeCanvas (Lienzo compuesto)
├─→ UIManager (Interfaz)
│   └─→ Editor2D (Control de herramientas)
├─→ AIManager (Gemini API)
│   └─→ Google Gemini (API externa)
├─→ Editor2D (Editor 2D)
│   └─→ LayerManager (Modifica capas)
└─→ Viewer3D (Visualizador 3D)
    └─→ Three.js (Engine 3D)

════════════════════════════════════════════════════════════════

⚙️ TECNOLOGÍAS UTILIZADAS

FRONTEND
├── Vanilla JavaScript (ES6+)
├── Three.js (3D rendering)
├── Tailwind CSS (Estilos)
├── Marked (Markdown parsing)
└── Font Awesome (Iconos)

BACKEND
├── Node.js
├── Express.js
├── CORS
├── Dotenv
└── Google Gemini API

DESARROLLO
├── ESLint (Linting)
├── Prettier (Formatting)
└── npm (Gestión de paquetes)

════════════════════════════════════════════════════════════════

📋 CARACTERÍSTICAS POR MÓDULO

App.js
├── Inicialización de managers
├── Ciclo de vida de la aplicación
├── Exportación de skins
└── Guardado a la nube (placeholder)

HistoryManager.js
├── Almacenamiento de estados
├── Deshacer (Undo)
├── Rehacer (Redo)
└── Gestión de límite de historial

LayerManager.js
├── Crear capas
├── Gestionar visibilidad
├── Composición de capas
├── Carga de imágenes
└── Actualización de textura 3D

UIManager.js
├── Configuración de herramientas
├── Gestor de colores
├── Atajos de teclado
├── Carga de archivos
└── Eventos drag-and-drop

AIManager.js
├── Integración Gemini API
├── Generación de paletas
├── Análisis de skins
└── Comunicación con IA

Editor2D.js
├── Dibujo en canvas
├── Herramientas (brush, eraser, etc.)
├── Modo espejo
├── Zoom
└── Manejo de eventos mouse/touch

Viewer3D.js
├── Construcción del rig
├── Mapeo UV
├── Iluminación
├── Controles de cámara
└── Actualización de textura

════════════════════════════════════════════════════════════════

🎯 CASOS DE USO PRINCIPALES

1. EDITAR SKIN
   Usuario → Selecciona herramienta → Pinta → Se actualiza capas
   → Se actualiza 3D → Se guarda en historial

2. CAMBIAR PALETA CON IA
   Usuario → Ingresa tema → AIManager llama Gemini → Colores nuevos
   → Se actualiza UI

3. ANALIZAR SKIN CON IA
   Usuario → Solicita análisis → Editor captura canvas
   → Se envía a Gemini → Recibe feedback → Se muestra resultado

4. MANEJAR CAPAS
   Usuario → Crea/elimina/ordena capas → LayerManager actualiza
   → Se actualiza composite → Se refleja en 3D

5. DESHACER/REHACER
   Usuario → Presiona Ctrl+Z → HistoryManager restaura estado
   → Se actualiza canvas

════════════════════════════════════════════════════════════════

🔐 FLUJO DE DATOS

Estados en Memoria:
├── STATE (Global)
│   ├── tool (actual)
│   ├── color (actual)
│   ├── brushSize
│   ├── zoom
│   └── activeLayerId
│
├── LAYERS (Canvases)
│   ├── Layer 1 (canvas)
│   ├── Layer 2 (canvas)
│   └── Composite (canvas)
│
└── HISTORY (Stack)
    ├── State 1
    ├── State 2
    └── ...

Datos Externos:
├── API Gemini
│   ├── Paletas generadas
│   └── Análisis de skins
│
└── Archivos
    ├── PNG importados
    └── PNG exportados

════════════════════════════════════════════════════════════════

✅ CARACTERÍSTICAS IMPLEMENTADAS

✓ Editor 2D con múltiples herramientas
✓ Sistema de capas
✓ Historial Undo/Redo
✓ Modo espejo
✓ Zoom configurable
✓ Visualizador 3D en tiempo real
✓ Rig oficial de Hytale
✓ Mapeo UV preciso
✓ Integración Gemini API
✓ Generador de paletas IA
✓ Análisis de skins IA
✓ Importación/Exportación PNG
✓ Atajos de teclado
✓ Soporte touch
✓ Drag & drop de archivos
✓ Interfaz responsive

════════════════════════════════════════════════════════════════

📦 DEPENDENCIAS

Producción:
├── express: Servidor web
├── cors: CORS middleware
└── dotenv: Variables de entorno

Desarrollo:
├── prettier: Formateador de código
└── eslint: Linter

CDN:
├── Three.js: Rendering 3D
├── Tailwind CSS: Estilos
├── Font Awesome: Iconos
├── Marked: Parser markdown
└── OrbitControls: Control de cámara 3D

════════════════════════════════════════════════════════════════

🚀 COMANDOS DISPONIBLES

npm install      → Instalar dependencias
npm run dev      → Iniciar servidor desarrollo
npm run build    → Compilar para producción
npm run start    → Iniciar servidor producción
npm run lint     → Verificar código
npm run format   → Formatear código

════════════════════════════════════════════════════════════════

📝 CONFIGURACIÓN REQUERIDA

.env:
├── GEMINI_API_KEY (requerido)
├── PORT (opcional, default: 3000)
└── NODE_ENV (optional, default: development)

════════════════════════════════════════════════════════════════

🎓 PRÓXIMAS MEJORAS

v1.1.0:
├── Vista previa de animaciones
├── Import/export de paletas
├── Formas de pinceles personalizadas
├── Herramientas de ruido/patrón
└── Herramientas de selección

v1.2.0:
├── Guardado en la nube
├── Compartir skins online
├── Cuentas de usuario
├── Galería de skins
└── Feedback comunitario

v2.0.0:
├── Soporte multi-personaje
├── Armadura y accesorios
├── Mapeo UV avanzado
├── Edición de animaciones
└── Soporte de materiales completo

════════════════════════════════════════════════════════════════
```
