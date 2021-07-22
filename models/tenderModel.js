const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
	tender_number: {
		type: String,
		required: true,
		unique: true,
	},
	tender_description: {
		type: String,
		required: true,
	},
	tender_employer: {
		type: String,
		required: true,
	},
	tender_meating_date: {
		type: Date,
		default: Date.now(),
	},
	tender_closing_date: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	tender_contact_details: {
		type: String,
		required: true,
	},
});

const Tender = mongoose.model('Tender', tenderSchema);

module.exports = Tender;
