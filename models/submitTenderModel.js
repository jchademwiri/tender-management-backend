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
	tender_amount: {
		type: String,
		required: true,
	},
	tender_employer: {
		type: String,
		required: true,
	},

	tender_closing_date: {
		type: Date,

		required: true,
	},
});

const Tender = mongoose.model('Tender', submitTenderSchema);

module.exports = Tender;
