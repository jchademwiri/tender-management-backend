const router = require('express').Router();
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
				errorMessage: 'Plesae enter same password twice',
			});

		const existingUser = await User.findOne({ email });
		console.log(existingUser);

		if (existingUser)
			return res.status(400).json({
				errorMessage: 'An account with this emaail already exists',
			});
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

module.exports = router;
