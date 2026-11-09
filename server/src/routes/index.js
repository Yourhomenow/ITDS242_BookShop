import express from 'express'
import { routes } from './routes.js';
import bookRoutes from './bookRoutes.js';

export const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

router.use('/books', bookRoutes);
router.use('/',routes);