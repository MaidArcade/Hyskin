# Hytale SkinForge - Changelog

## [1.0.0] - 2025-11-26

### Added
- Initial release of Hytale SkinForge
- Full modular architecture with ES6 modules
- 2D pixel art editor with multiple tools (brush, eraser, fill, color picker)
- Mirror mode for symmetrical painting
- Layer-based composition system
- Full undo/redo history (20 states)
- Keyboard shortcuts support
- Real-time 3D character preview with Three.js
- Official Hytale rig with accurate UV mapping
- Google Gemini AI integration
- Automatic color palette generation
- AI skin analysis and feedback
- Professional Express.js backend
- Responsive design with Tailwind CSS
- Comprehensive documentation

### Features
- **Editing**: Brush, eraser, fill tool, color picker
- **Layers**: Create, manage, and organize layers
- **History**: Unlimited undo/redo within session
- **3D View**: Real-time character preview
- **AI Tools**: Palette generation and skin analysis
- **Import/Export**: Load PNG skins, export as PNG

### Technical
- Vanilla JavaScript (ES6+)
- Three.js for 3D rendering
- Tailwind CSS for styling
- Express.js backend
- Google Gemini 2.5 Flash API

## Planned Features

### v1.1.0
- [ ] Animation previews
- [ ] Palette import/export
- [ ] Custom brush shapes
- [ ] Noise and pattern tools
- [ ] Selection tools

### v1.2.0
- [ ] Cloud save/load
- [ ] Sharing skins online
- [ ] User accounts
- [ ] Skin gallery
- [ ] Community feedback

### v2.0.0
- [ ] Multi-character support
- [ ] Armor and accessories
- [ ] Advanced UV mapping
- [ ] Animation editing
- [ ] Full material support

## Known Issues

- API key must be configured in .env for AI features
- 3D model requires WebGL support
- Large undo history may impact performance

## Migration Guide

### From Single File to Modular

If you were using the original single-file version:

1. Install dependencies: `npm install`
2. Copy your custom code into appropriate managers
3. Update imports in `src/js/app.js`
4. Test all functionality
5. Deploy using `npm run build`

## Support

For issues and questions:
- Check DEVELOPMENT.md for guidelines
- Review troubleshooting section in README
- Open an issue on GitHub
