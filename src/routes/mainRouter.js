import express from 'express';
// import connectEnsureLogin from 'connect-ensure-login';


import * as pages from '../controllers/pages.js';
// import * as auth from '../controllers/auth.js';

const router = express.Router();

router.get('/', pages.index);
// router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), pages.dashboard);

// router.get('/logout', auth.logout);
// router.get('/login', auth.showLogin);
// router.post('/login', auth.login);
// router.get('/register', auth.showReg);
// router.post('/register', auth.register);

export default router;