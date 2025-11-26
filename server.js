import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hytale SkinForge is running' });
});

// Serve API key to frontend (secure in production)
app.get('/api/config', (req, res) => {
  res.json({
    apiKey: process.env.GEMINI_API_KEY ? '***' : 'not-configured'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🎨 Hytale SkinForge running on http://localhost:${PORT}`);
  console.log(`📝 Make sure to set GEMINI_API_KEY in .env`);
});
