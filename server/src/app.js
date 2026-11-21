import express from "express"
import cors from "cors"
import 'dotenv/config';
import {router as routes} from './routes/index.js';

export const app = express();

app.use(express.json({limit:"16kb"}))
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ],
  credentials: true,
}))

app.use('/api',routes)


