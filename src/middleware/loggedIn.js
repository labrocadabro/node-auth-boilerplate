export default function loggedIn(req, res, next) {
	res.locals.loggedIn = req.isAuthenticated();
	if (req.isAuthenticated()) res.locals.user = req.user;
	next();
}