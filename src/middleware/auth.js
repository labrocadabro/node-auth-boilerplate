import Token from "../models/Token.js";

export default async function auth(req, res, next) {
	res.locals.loggedIn = req.isAuthenticated();
	if (res.locals.loggedIn) {
		const { username, verified, googleId, githubId } = req.user; 
		res.locals.user = { username, verified, googleId, githubId };
		if (!req.user.verified) {
			const token = await Token.findOne({ email: req.user.username });
			res.locals.token = token;
		} else {
			res.locals.token = null;
		}
	}
	next();
}