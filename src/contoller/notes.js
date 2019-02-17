const notes = {};

// Models
const Note = require('../models/Note');

notes.read = async(req, res) => {
	const userID = req.user.id;
	const notes = await Note.find({user: userID}).sort({ date: 'desc' });

	res.render('notes/all-notes', { notes });
}

notes.readById = async(req, res) => {
	const id = req.params.id;
	const note = await Note.findById(id);

	res.render('notes/update-note', { note });
}

notes.create = async (req, res) => {
	const { title, description } = req.body;
	const errors = [];
	if( !title ) {
		errors.push({text: 'Please Writer a Title'});
	}
	if( !description ) {
		errors.push({text: 'Please Writer a Description'});
	}
	if (errors.length > 0 ) {
		res.render('notes/create-note', {
			errors,
			title,
			description,
		});
	} else {
		const newNote = new Note({ title, description });
		newNote.user = req.user.id;
		await newNote.save();
		
		req.flash('success_msg', 'Note Added Successfuly');
		res.redirect('/notes');
	}
}

notes.update = async (req, res) => {
	const id = req.params.id;
	const { title, description } = req.body;
	const errors = [];
	if( !title ) {
		errors.push({text: 'Please Writer a Title'});
	}
	if( !description ) {
		errors.push({text: 'Please Writer a Description'});
	}
	if (errors.length > 0 ) {
		res.render('notes/update-note', {
			errors,
			title,
			description,
		});
	} else {
		await Note.findByIdAndUpdate(id, { title, description });

		req.flash('success_msg', 'Note Updated Successfuly');
		res.redirect('/notes');
	}
}

notes.delete = async(req, res) => {
	const id = req.params.id;
	await Note.findByIdAndDelete(id);

	req.flash('success_msg', 'Note Deleted Successfuly');
	res.redirect('/notes');
}

module.exports = notes;