import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { explainConcept } from './services/geminiService.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Explain concept
app.post('/api/explain-concept', async (req, res) => {
  try {
    const { concept, level = 'beginner' } = req.body;
    const explanation = await explainConcept(concept, level);
    res.json({ explanation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to explain concept' });
  }
});


app.listen(PORT, () => {
  console.log(`DSA Instructor server running on port ${PORT}`);
});
