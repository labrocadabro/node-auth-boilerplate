export default function loggedIn(req, res, next) {
	res.locals.loggedIn = req.isAuthenticated();
	next();
}