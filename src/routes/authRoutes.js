import express from 'express';
import { showRegister, registerUser, showLogin, loginUser, logoutUser } from '../controllers/userController.js';
import { ensureGuest } from '../middlewares/authMiddleware.js';
import { validateUser } from '../middlewares/validationMiddleware.js';
import { trackLastVisit } from '../middlewares/lastVisitMiddleware.js';

const router = express.Router();

router.use(trackLastVisit);

router.get('/login', ensureGuest, showLogin);
router.get('/register', ensureGuest, showRegister);
router.post('/register', ensureGuest, validateUser, registerUser);
router.post('/login', ensureGuest, loginUser);
router.post('/logout', logoutUser);

export default router;
