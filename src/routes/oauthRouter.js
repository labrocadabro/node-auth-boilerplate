import express from 'express';
import passport from 'passport';


const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
		console.log(req.user)
    res.redirect('/dashboard');
  });



export default router;