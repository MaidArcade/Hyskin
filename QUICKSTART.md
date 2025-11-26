# Quick Start Guide - Hytale SkinForge

## 🚀 Get Started in 3 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key
```bash
cp .env.example .env
# Edit .env and paste your Gemini API key
```

**Get your free API key:**
- Visit: https://aistudio.google.com/app/apikey
- Copy your API key
- Paste it in `.env` as: `GEMINI_API_KEY=your_key_here`

### 3. Start Development Server
```bash
npm run dev
```

✅ Open http://localhost:3000 in your browser!

---

## 📚 Project Structure

```
Hyskin/
├── src/
│   ├── js/              # JavaScript modules
│   │   ├── app.js       # Main application
│   │   ├── managers/    # Business logic
│   │   ├── editors/     # 2D editor
│   │   ├── viewers/     # 3D viewer
│   │   ├── config/      # Constants
│   │   └── data/        # Rig data
│   └── css/             # Styles
├── public/
│   └── index.html       # HTML entry point
├── config/
│   └── app.config.json  # App configuration
├── server.js            # Express server
├── package.json         # Dependencies
└── README.md            # Full documentation
```

---

## 🎨 Quick Tips

### Drawing Tools
- **B** - Brush tool
- **E** - Eraser tool
- **F** - Fill tool
- **P** - Color picker

### General Shortcuts
- **Ctrl+Z** - Undo
- **Ctrl+Y** - Redo

### 3D Preview
- **Click + Drag** - Rotate model
- **Scroll** - Zoom
- **Click Reset** - Reset view

---

## 🤖 AI Features

### Color Palette Generator
1. Click "Asistente IA" button
2. Enter a theme (e.g., "Fire Knight")
3. Click arrow button
4. 6 new colors will appear

### Skin Analysis
1. Click "Asistente IA" button
2. Switch to "Análisis" tab
3. Click "Analizar Skin Actual"
4. Get design suggestions

---

## 📁 File Locations

| What | Where |
|------|-------|
| Configuration | `src/js/config/constants.js` |
| Rig Data | `src/js/data/rigData.js` |
| Managers | `src/js/managers/` |
| Styles | `src/css/styles.css` |
| HTML | `public/index.html` |
| Server | `server.js` |

---

## ⚙️ Available Commands

```bash
npm run dev      # Development server (port 3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Check code quality
npm run format   # Auto-format code
```

---

## 🔧 Troubleshooting

### Issue: "Cannot find module"
**Solution:** Run `npm install`

### Issue: "API key not configured"
**Solution:** Check `.env` file has `GEMINI_API_KEY` set

### Issue: "3D model not showing"
**Solution:** 
- Check browser console (F12)
- Verify WebGL is supported
- Try a different browser

### Issue: "Drawing not working"
**Solution:**
- Check layer is visible (eye icon)
- Verify brush size > 0
- Check you're in the correct tool

---

## 📖 Learn More

- **Full Documentation:** See `README.md`
- **Development Guide:** See `DEVELOPMENT.md`
- **Changelog:** See `CHANGELOG.md`

---

## 🎓 Architecture Overview

```
┌─────────────────────────────────────────┐
│         HTML Interface (index.html)      │
├─────────────────────────────────────────┤
│         App.js (Main Controller)         │
├─────────────────────────────────────────┤
│  Managers          Editors      Viewers  │
│  ├─ AI             ├─ 2D        ├─ 3D   │
│  ├─ Layer          ├─ Canvas    └─ Rig  │
│  ├─ History        └─ Paint              │
│  └─ UI                                   │
├─────────────────────────────────────────┤
│     Express Server (server.js)           │
├─────────────────────────────────────────┤
│     External APIs (Google Gemini)        │
└─────────────────────────────────────────┘
```

---

## 💡 Pro Tips

1. **Save Regularly** - Export PNG files to backup
2. **Use Layers** - Organize your work with multiple layers
3. **Mirror Mode** - Toggle for symmetrical designs
4. **3D Preview** - Rotate to check all angles
5. **AI Palette** - Use AI suggestions as starting point
6. **Keyboard** - Use shortcuts for faster workflow

---

## 🤝 Contributing

Want to add features?

1. Create a branch: `git checkout -b feature/my-feature`
2. Make changes
3. Test thoroughly
4. Commit: `git commit -m 'Add feature'`
5. Push and open PR

See `DEVELOPMENT.md` for guidelines.

---

## 📝 License

MIT - Use freely in personal and commercial projects

---

**Happy Creating! 🎨**
