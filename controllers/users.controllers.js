/***** MODELS  *****/
const User = require('../models/user.model');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};

module.exports.createUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Bienvenue sur Yelp Camp !');
            res.redirect('/campgrounds');
        });
    } catch (error) {
        req.flash('error', (error.message = "L'utilisateur existe déjà !"));
        res.redirect('/register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Bienvenue !');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout();
    req.flash('success', 'Vous êtes déconnecté');
    res.redirect('/campgrounds');
};
