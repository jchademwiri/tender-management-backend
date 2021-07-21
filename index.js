const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));

app.get('/test', (req, res) => {
	res.send('Test successfull');
});
