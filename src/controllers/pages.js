export const index = (req, res) => {
	res.render("index");
};

export const dashboard = (req, res) => {
	if (!req.isAuthenticated()) res.redirect('/login');
	else res.render("dashboard");
};

export const login = (req, res) => {
	if (req.isAuthenticated()) res.redirect('/dashboard');
	else res.render('login');
};

export const register = (req, res) => {
	if (req.isAuthenticated()) res.redirect('/dashboard');
	else res.render('register');
};