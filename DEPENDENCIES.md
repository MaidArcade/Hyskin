# Dependencies & Installation Guide

## 📦 Project Dependencies

### Production Dependencies

```json
{
  "express": "^4.18.2",      // Web framework
  "cors": "^2.8.5",          // CORS middleware
  "dotenv": "^16.3.1"        // Environment variables
}
```

### Development Dependencies

```json
{
  "prettier": "^3.0.3",      // Code formatter
  "eslint": "^8.50.0"        // Code linter
}
```

### CDN Dependencies (loaded in HTML)

| Library | Version | Purpose |
|---------|---------|---------|
| Three.js | r128 | 3D rendering |
| OrbitControls | Latest | Camera controls |
| Tailwind CSS | Latest | CSS framework |
| Font Awesome | 6.4.0 | Icons |
| Marked | Latest | Markdown parser |

---

## 🔧 Installation Steps

### 1. Prerequisites

- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **Git**: For version control

**Check versions:**
```bash
node --version      # Should be v16+
npm --version       # Should be v7+
git --version       # Should be installed
```

### 2. Clone Repository

```bash
git clone https://github.com/MaidArcade/Hyskin.git
cd Hyskin
```

### 3. Install Dependencies

```bash
npm install
```

This will:
- Install Express, CORS, and dotenv
- Install ESLint and Prettier (dev only)
- Create `node_modules/` directory
- Generate `package-lock.json`

### 4. Configure Environment

```bash
# Copy template
cp .env.example .env

# Edit with your API key
nano .env  # or use your favorite editor
```

**Required:**
```env
GEMINI_API_KEY=your_api_key_here
```

**Optional:**
```env
PORT=3000
NODE_ENV=development
```

### 5. Start Development

```bash
npm run dev
```

Expected output:
```
🎨 Hytale SkinForge running on http://localhost:3000
📝 Make sure to set GEMINI_API_KEY in .env
```

Open browser: `http://localhost:3000`

---

## 📥 Detailed Dependency Info

### Express.js

**What it does:** Web server framework

**Why we use it:**
- Lightweight and fast
- Great middleware support
- Easy routing
- Perfect for single-page apps

**Version:** ^4.18.2 (latest stable)

```javascript
import express from 'express';
const app = express();
app.use(express.static('public'));
```

### CORS

**What it does:** Cross-Origin Resource Sharing

**Why we use it:**
- Allow API calls from frontend
- Handle preflight requests
- Manage cross-domain requests

**Version:** ^2.8.5

```javascript
import cors from 'cors';
app.use(cors());
```

### Dotenv

**What it does:** Environment variable management

**Why we use it:**
- Secure API keys
- Environment-specific config
- Hide sensitive data
- Easy local development

**Version:** ^16.3.1

```javascript
import dotenv from 'dotenv';
dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;
```

### Three.js (CDN)

**What it does:** 3D JavaScript library

**Why we use it:**
- Renders 3D character model
- Handles WebGL
- Provides scene, camera, renderer
- Easy to use API

**Version:** r128 (from CDN)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

### Tailwind CSS (CDN)

**What it does:** Utility-first CSS framework

**Why we use it:**
- Rapid UI development
- Responsive design
- Dark mode support
- Small bundle size

**Version:** Latest (from CDN)

```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Font Awesome (CDN)

**What it does:** Icon library

**Why we use it:**
- Beautiful icons
- Easy to use
- Free and open source
- Consistent styling

**Version:** 6.4.0 (from CDN)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
```

### Marked (CDN)

**What it does:** Markdown to HTML parser

**Why we use it:**
- Parse AI responses
- Format feedback text
- Support markdown syntax

**Version:** Latest (from CDN)

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

### ESLint

**What it does:** JavaScript linter

**Why we use it:**
- Catch errors early
- Enforce code style
- Improve code quality
- Development only

**Version:** ^8.50.0

```bash
npm run lint
```

### Prettier

**What it does:** Code formatter

**Why we use it:**
- Consistent code style
- Automatic formatting
- No debates about style
- Development only

**Version:** ^3.0.3

```bash
npm run format
```

---

## 🔧 Troubleshooting Installation

### Issue: "npm command not found"

**Solution:** Install Node.js from https://nodejs.org/

```bash
# Verify installation
node --version
npm --version
```

### Issue: "Cannot find module 'express'"

**Solution:** Run npm install

```bash
npm install
```

### Issue: Permission denied errors

**Solution:** Use sudo or fix npm permissions

```bash
# Option 1: Use sudo (not recommended)
sudo npm install

# Option 2: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Issue: Port 3000 already in use

**Solution:** Change PORT in .env

```env
PORT=3001
```

Or kill the process:
```bash
lsof -ti:3000 | xargs kill -9
```

### Issue: Module not found errors

**Solution:** Clean install

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: API Key errors

**Solution:** Check .env file

```bash
cat .env
# Should show: GEMINI_API_KEY=your_key_here
```

---

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with:
- All HTML, CSS, JS files
- Server configuration
- Updated package.json

### Install Production Dependencies Only

```bash
cd dist
npm install --production
```

### Set Production Environment

```bash
cp .env.example .env
# Edit with production values
export NODE_ENV=production
```

### Start Production Server

```bash
npm start
```

---

## 📊 Dependency Tree

```
Hyskin/
├── express (4.18.2)
│   ├── debug
│   ├── depd
│   ├── body-parser
│   └── ...
├── cors (2.8.5)
│   ├── object-assign
│   └── vary
└── dotenv (16.3.1)
    └── (no dependencies)

[Development Dependencies]
├── prettier (3.0.3)
│   └── (formatting tools)
└── eslint (8.50.0)
    └── (linting tools)

[External CDN]
├── Three.js r128
├── Tailwind CSS
├── Font Awesome 6.4.0
├── Marked
└── OrbitControls
```

---

## 🔒 Security Notes

### API Key Protection

❌ **NEVER commit .env files**
✅ **Always use environment variables**

```javascript
// ✅ Secure
const key = process.env.GEMINI_API_KEY;

// ❌ Insecure
const key = "sk-1234567890"; // Don't do this!
```

### Dependencies Audit

Check for security vulnerabilities:

```bash
npm audit
```

Fix vulnerabilities:

```bash
npm audit fix
```

---

## 📈 Performance Impact

| Dependency | Size | Impact |
|------------|------|--------|
| Express | ~50KB | Minimal |
| CORS | ~2KB | Minimal |
| Dotenv | ~5KB | None (dev only) |
| **Total npm** | ~15MB | Dev only |

**CDN Libraries:**
- Three.js: ~600KB (gzipped)
- Tailwind: ~50KB (gzipped)
- Others: ~100KB combined

---

## 🔄 Updating Dependencies

### Check for Updates

```bash
npm outdated
```

### Update All

```bash
npm update
```

### Update Specific Package

```bash
npm update express
```

### Update to Latest

```bash
npm install express@latest
```

---

## 📚 Learning Resources

- **Express.js**: https://expressjs.com/
- **Three.js**: https://threejs.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/
- **Node.js**: https://nodejs.org/docs/
- **npm**: https://docs.npmjs.com/

---

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Configure .env
3. ✅ Run `npm run dev`
4. ✅ Visit http://localhost:3000
5. ✅ Start creating skins!

---

**Questions?** Check DEVELOPMENT.md or open an issue.
