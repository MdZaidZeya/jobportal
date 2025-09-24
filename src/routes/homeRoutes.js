import express from 'express';
import { trackLastVisit } from '../middlewares/lastVisitMiddleware.js';

const router = express.Router();

router.use(trackLastVisit);

router.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

export default router;
