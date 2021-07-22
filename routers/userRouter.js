const router = require('express').Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post('/', async (req, res) => {
	try {
		const { fullname, email, password, passwordverify } = req.body;

		// vallidation

		if (!fullname || !email || !password || !passwordverify)
			return res
				.status(400)
				.json({ errorMessage: 'Please enter all required fields' });

		if (password.length < 6)
			return res.status(400).json({
				errorMessage: 'Password is too short, it must be at least 6 charactors',
			});

		if (password !== passwordverify)
			return res.status(400).json({
				errorMessage: 'Passwords did not match',
			});

		const existingUser = await User.findOne({ email });

		if (existingUser)
			return res.status(400).json({
				errorMessage: 'An account with this emaail already exists',
			});
		// Hash the password

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		// Save to database new user account

		const newUser = new User({
			fullname,
			email,
			passwordHash,
		});
		const savedUser = await newUser.save();

		// Log in users with token

		const token = jwt.sign(
			{
				user: savedUser._id,
			},
			process.env.JWT_SECRET
		);

		// send the token to http-only cookie

		res
			.cookie('token', token, {
				httpOnly: true,
				secure: true,
				sameSite: 'none',
			})
			.send();
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

// Login

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		// vallidation

		if (!email || !password)
			return res
				.status(400)
				.json({ errorMessage: 'Please enter all required fields' });

		const existingUser = await User.find({ email: req.body.email });

		if (!existingUser)
			return res.status(401).json({ errorMessage: 'Wrong email or password' });

		const passwordCorrect = await bcrypt.compare(
			password,
			existingUser.passwordHash
		);
		if (!passwordCorrect)
			return res.status(401).json({ errorMessage: 'Wrong email or password.' });

		// Sign the token

		const token = jwt.sign(
			{
				user: existingUser._id,
			},
			process.env.JWT_SECRET
		);

		// send the token to http-only cookie

		res
			.cookie('token', token, {
				httpOnly: true,
				secure: true,
				sameSite: 'none',
			})
			.send();
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

module.exports = router;
