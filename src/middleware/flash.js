export default function loggedIn(req, res, next) {
	res.locals.flash = req.session.flash;
	next();
}