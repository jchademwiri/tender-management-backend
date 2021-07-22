const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
app.use(express.json());
// connect to mongoDB

mongoose.connect(
	process.env.DB_CONNECT,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) return console.error(err);
		console.log('Connected to MongoDB');
	}
);

// set up routes

app.use('/auth', require('./routers/userRouter'));
app.use('/tenders', require('./routers/tenderRouter'));
