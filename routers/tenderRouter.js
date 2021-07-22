const router = require('express').Router();
const Tender = require('../models/tenderModel');

router.post('/', async (req, res) => {
	try {
		const {
			tender_number,
			tender_description,
			tender_employer,
			tender_meating_date,
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
				errorMessage: 'An Tender with this Tebder Number already exists',
			});
	} catch (err) {
		console.error(err);
		res.status(500).send();
	}
});

module.exports = router;
