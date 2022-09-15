import passport from 'passport';
import validator from 'validator';

import User from '../models/User.js';
import Token from '../models/Token.js';

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
			res.redirect('/email/verify');
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

export const verify = async (req, res) => {
	try {
		if (!req.query.token) return res.redirect('/dashboard');
		const token = await Token.findOne({ token: req.query.token });
		if (!token) {
			req.session.flash = { type: "error", message: ["Invalid or expired link."]}
			return res.redirect('/dashboard');
		}
		const user = await User.findOne({ username: token.email });
		if (!user || user.username !== req.user.username) {
			req.session.flash = { type: "error", message: ["Invalid or expired link."]}
			return res.redirect('/dashboard');
		}
		user.verified = true;
		await user.save();
		await Token.findOneAndDelete({ token });
		req.session.flash = { type: "success", message: ["Your email has been verified."]}
		res.redirect('/dashboard');
	} catch (err) {
		console.log(err);
		req.session.flash = { type: "error", message: ["Verification error."]}
		res.redirect('/dashboard');
	}
}

export const reset = async (req, res) => {
	const user = await User.findOne({ username: req.body.username });
	if (!user) {
		req.session.flash = { type: 'error', message: ['Invalid user.']};
		return res.redirect('/forgot');
	}
	await user.setPassword(req.body.password);
	await user.save();
	await Token.findOneAndDelete({ token: req.body.token })
	req.session.flash = { type: "success", message: ["Password changed successfully."]};
	res.redirect("/login");
}






