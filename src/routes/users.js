const express = require('express');
const router = express.Router();

// Controller
const users = require('../contoller/users');

// Render Simple Views
router.get('/users/signin', (req, res) => {
	res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
	res.render('users/signup');
});

// Functions of Controller
router.post('/users/signin', users.signIn);

router.post('/users/signup', users.singUp);

router.get('/users/singout', users.signOut);


module.exports = router;
