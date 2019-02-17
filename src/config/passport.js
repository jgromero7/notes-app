const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// Model
const User = require('../models/User');

passport.use(new localStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	const user = await User.findOne({email: email});
	if ( !user ) {
		return done(null, false, { message: 'Not User found' });
	} else {
		const match = await user.matchPassword(password, user.password);
		if ( match ) {
			return done(null, user);
		}else{
			return done(null, false, { message: 'Incorrect Password' });
		}
	}
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});