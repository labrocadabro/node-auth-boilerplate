import express from 'express';
import passport from 'passport';
import { Octokit } from "@octokit/core";
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";
import dotenv from 'dotenv';

import User from '../models/User.js';

dotenv.config();

const router = express.Router();


// GOOGLE
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard');
  });

router.get('/google/revoke', async (req, res) => {
	try {
		if (req.query.success !== 'true') throw new Error();
		const user = await User.findById(req.user._id);
		user.googleId = null;
		user.googleToken = null;
		await user.save();
		req.session.flash = { type: 'success', message: ['Google acocunt unlinked successfully'] };
		res.redirect('/account');
	} catch (err) {
		req.session.flash = { type: 'error', message: ["Could not unlink account"] };
		res.redirect('/account');
	}	
});


// GITHUB

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard');
  });

router.get('/github/revoke', async (req, res) => {
	try {
		const octokit = new Octokit({
			authStrategy: createOAuthUserAuth,
			auth: {
				clientId: process.env.GITHUB_ID,
				clientSecret:  process.env.GITHUB_SECRET,
			},
		});   
		await octokit.request(`DELETE /applications/${process.env.GITHUB_ID}/grant`, { access_token: req.user.githubToken });
		const user = await User.findById(req.user._id);
		user.githubId = null;
		user.githubToken = null;
		await user.save();
		req.session.flash = { type: 'success', message: ['Github account unlinked successfully'] };
		res.redirect('/account');
	} catch (err) {
		req.session.flash = { type: 'error', message: ["Could not unlink account."] };
		res.redirect('/account');
	}	
});


export default router;