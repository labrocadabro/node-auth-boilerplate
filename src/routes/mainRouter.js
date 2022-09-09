import express from 'express';
// import connectEnsureLogin from 'connect-ensure-login';


import * as pages from '../controllers/pages.js';
// import * as auth from '../controllers/auth.js';

const router = express.Router();

router.get('/', pages.index);
// router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), pages.dashboard);

router.get('/logout', pages.logout);
router.get('/login', pages.showLogin);
router.post('/login', pages.login);
router.get('/register', pages.showReg);
router.post('/register', pages.register);

export default router;