const users = {};

const passport = require('passport');

// Models
const User = require('../models/User');

users.signIn = passport.authenticate('local', {
	successRedirect: '/notes',
	failureRedirect: '/users/signin',
	failureFlash: true,
});

users.signOut = (req, res) => {
	req.logout();
	res.redirect('/');
}

users.singUp = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;

	errors = [];
	if ( password != confirm_password ) {
		errors.push({ text: 'Password do not match '})
	}
	if ( password.length < 4 ) {
		errors.push({ text: 'Password must be at least 4 characters' });
	}
	if ( errors.length > 0 ) {
		res.render('users/signup', { errors, name, email });		
	} else {
		const emailUser = await User.findOne({email: email});
		
		if ( emailUser ) {
			req.flash('error_msg', 'The email is arready in use');
			res.redirect('/users/signup');
		} else {
			const newUser = new User({ name, email, password});
			newUser.password = await newUser.encryptPassword(password);
			await newUser.save();

			req.flash('success_msg', 'You are registered');
			res.redirect('/users/signin');
		}
	}
}

module.exports = users;