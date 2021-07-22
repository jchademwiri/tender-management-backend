const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: [true, 'please provide a full name'],
	},
	email: {
		type: String,
		required: [true, 'Please provide email address'],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
	},
	passwordHash: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
