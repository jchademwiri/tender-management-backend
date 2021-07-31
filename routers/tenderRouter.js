const router = require('express').Router();
const Tender = require('../models/tenderModel');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
	try {
		const {
			tender_number,
			tender_description,
			tender_employer,
			tender_meeting_date,
			tender_closing_date,
			tender_contact_details,
		} = req.body;

		// vallidation

		if (
			!tender_number ||
			!tender_description ||
			!tender_employer ||
			!tender_closing_date ||
			!tender_contact_details
		)
			return res
				.status(400)
				.json({ errorMessage: 'Please enter all required fields' });

		const existingTender = await Tender.findOne({ tender_number });
		console.log(existingTender);
		if (existingTender)
			return res.status(400).json({
				errorMessage: 'A Tender with this Tender Number already exists',
			});

		// Save to database new user account

		const newTender = new Tender({
			tender_number,
			tender_description,
			tender_employer,
			tender_meeting_date,
			tender_closing_date,
			tender_contact_details,
		});
		const savedTender = await newTender.save();
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

router.get('/', auth, async (req, res) => {
	try {
		const tenders = await Tender.find();
		res.json(tenders);
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

module.exports = router;
