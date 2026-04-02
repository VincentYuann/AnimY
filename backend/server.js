import 'dotenv/config';
import cors from 'cors'
import express from 'express';
import animeRouter from './routes/anime.route.js';

const app = express();

app.use(cors({
  origin: 'https://anim-5zi58k25t-vincentyuanns-projects.vercel.app/',
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
            status: 'active',
            message: 'AnimY Backend API',
            version: '1.0.0',
            uptime: Math.floor(process.uptime()) + 's'
        });
})

app.use('/api/anime', animeRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ AnimY Server Initialized on Port ${PORT}`);
})