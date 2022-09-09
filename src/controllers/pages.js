import passport from 'passport';
import User from '../models/User.js';


export const index = (req, res) => {
    res.render("index");
};

export const dashboard = (req, res) => {
    res.render("dashboard");
};



// Authentication
export const showLogin = (req, res) => {
    if (req.isAuthenticated()) res.redirect('/dashboard');
    else res.render('login');
};

export const showReg = (req, res) => {
    if (req.isAuthenticated()) res.redirect('/dashboard');
    else res.render('register');
};

export const register = async (req, res) => {
    try {
        const user = new User({ username: req.body.username });
        await User.register(user, req.body.password);
        const texts = await QuestionText.find();
        texts.forEach(text => {
            const question = new Question({ user: user, questNo: text.questNo, question: text.question, technical: text.technical });
            question.save();
        });
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.redirect('/register');
    }
};

export const login = passport.authenticate('local', {
    failureRedirect: '/login',
    successReturnToOrRedirect: "/dashboard"
});

export const logout = (req, res) => {
    req.logout(err => { if (err) return next(err) });
    res.redirect('/login');
};





