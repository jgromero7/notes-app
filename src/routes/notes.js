const express = require('express');
const router = express.Router();

// Controller 
const notes = require('../contoller/notes');

const { isAuthenticated } = require('../helpers/auth');

// Render Simple Views
router.get('/notes/create', isAuthenticated, (req, res) => {
	res.render('notes/create-note');
});

// Functions of Controller
router.get('/notes', isAuthenticated, notes.read);

router.get('/notes/:id', isAuthenticated, notes.readById);

router.post('/notes/create', isAuthenticated, notes.create);

router.put('/notes/update/:id', isAuthenticated, notes.update);

router.delete('/notes/delete/:id', isAuthenticated, notes.delete);


module.exports = router;
