import passport from 'passport';
import validator from 'validator';
import crypto from 'crypto';
import User from '../models/User.js';


export const register = async (req, res) => {

	try {
		const validationErrors = [];
		if (!validator.isEmail(req.body.username)) validationErrors.push('Please enter a valid email address');
		if (validator.isEmpty(req.body.password)) validationErrors.push('Password cannot be blank');
		if (!validator.equals(req.body.password, req.body.confirm)) validationErrors.push('Passwords must match');
		if (validationErrors.length) {
			req.session.flash = { type: "error", message: validationErrors };
			return res.redirect('/register');
		}
		const user = new User({ username: req.body.username });
		await User.register(user, req.body.password);
		passport.authenticate('local')(req, res, function () {
			req.session.flash = { type: "success", message: ['Account created successfully'] };
			res.redirect('/dashboard');
		});

	} catch (err) {
			req.session.flash = { type: 'error', message: [err.message] };
			res.redirect('/register');
	}
};

export const login = (req, res, next) => {
	const validationErrors = [];
	if (!validator.isEmail(req.body.username)) validationErrors.push('Please enter a valid email address');
	if (validator.isEmpty(req.body.password)) validationErrors.push('Password cannot be blank');

	if (validationErrors.length) {
		req.session.flash = { type: "error", message: validationErrors };
		console.log(validationErrors)
		return res.redirect('/login');
	}
	req.body.username = validator.normalizeEmail(req.body.username, { gmail_remove_dots: false })

	passport.authenticate('local', (err, user, info) => {
		if (err) { return next(err) }
		if (!user) {
			req.session.flash = { type: "error", message: ["Invalid email or password"]};
			return res.redirect('/login');
		}
		req.logIn(user, (err) => {
			if (err) { return next(err) }
			res.redirect(req.session.returnTo || '/dashboard');
		})
	})(req, res, next)
}

export const logout = (req, res) => {
	req.logout(err => { if (err) return next(err) });
	res.redirect('/login');
};

export const notLoggedIn = (req, res) => {
	req.session.flash = { type: "error", message: "Please log in to continue." };
	res.redirect('/login');
}

export const sendVerification = (req, res) => {
	if (req.user.verified) res.redirect('/dashboard');
	const token = crypto.randomBytes(32).toString('hex');
	console.log(token)
	res.redirect(req.session.returnTo || '/dashboard');
};





