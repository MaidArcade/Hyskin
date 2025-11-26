# Development Guidelines

## Code Style

### JavaScript
- Use ES6+ syntax (arrow functions, const/let, template literals)
- Follow camelCase for variables and functions
- Use PascalCase for classes
- Add JSDoc comments for public methods

Example:
```javascript
/**
 * Load base image into bottom layer
 * @param {Image} img - The image to load
 */
loadBaseImage(img) {
  // Implementation
}
```

### File Organization
- Keep classes to a single responsibility
- Place related code in the same directory
- Use descriptive filenames
- Export one main thing per file

## Adding Features

### New Tool

1. Add tool constant to `src/js/config/constants.js`
2. Create tool handler in `Editor2D.js`
3. Add UI button in `public/index.html`
4. Update `UIManager.js` for bindings

### New Manager

1. Create class in `src/js/managers/`
2. Extend with necessary methods
3. Register in `app.js` constructor
4. Export from module

### New API Integration

1. Add methods to `AIManager.js`
2. Create API call wrapper
3. Handle errors gracefully
4. Add loading indicators

## Testing

While formal testing setup is pending:
- Test in browser dev tools
- Use console logs for debugging
- Verify with multiple browsers
- Check 3D rendering on different GPUs

## Performance

- Keep render calls minimal
- Use throttling for frequent events
- Monitor canvas memory usage
- Profile with Chrome DevTools

## Security

- Never commit `.env` files with real keys
- Validate all user inputs
- Sanitize API responses
- Use HTTPS in production

## Debugging

1. Open Chrome DevTools (F12)
2. Check Console for errors
3. Use Network tab for API calls
4. Profile performance with Performance tab
5. Debug 3D with WebGL inspector

## Common Issues

### Module not found
- Check import paths are correct
- Verify file exists in expected location
- Restart dev server

### Styling not applied
- Clear browser cache
- Check CSS selectors
- Verify Tailwind classes exist
- Check CSS file is linked

### 3D model not showing
- Verify Three.js is loaded
- Check renderer is created
- Verify canvas has dimensions
- Check WebGL support

### API calls failing
- Verify API key in .env
- Check browser console for CORS errors
- Verify request format
- Check API quota/limits
