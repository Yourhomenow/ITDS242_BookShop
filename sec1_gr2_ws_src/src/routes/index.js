import express from 'express'
import { routes } from './routes.js';

export const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

router.use('/',routes);