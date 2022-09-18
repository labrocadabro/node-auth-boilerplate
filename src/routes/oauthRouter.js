import express from 'express';
import passport from 'passport';

import User from '../models/User.js';


const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard');
  });
router.get('/google/revoke', async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		user.googleId = null;
		user.googleToken = null;
		await user.save();
		req.session.flash = { type: 'success', message: ['Google acocunt unlinked'] };
		res.redirect('/account');
	} catch (err) {
		req.session.flash = { type: 'error', message: [err.message] };
		res.redirect('/account');
	}	
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard');
  });



export default router;