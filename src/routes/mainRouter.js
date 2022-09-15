import express from 'express';
// import connectEnsureLogin from 'connect-ensure-login';


import * as pages from '../controllers/pages.js';
import * as auth from '../controllers/auth.js';

const router = express.Router();

router.get('/', pages.index);
router.get('/dashboard', pages.dashboard);

router.get('/register', pages.register);
router.get('/login', pages.login);
router.get('/forgot', pages.forgot);

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

router.get('/verify', auth.verify);

export default router;