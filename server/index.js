const express = require('express');
require('dotenv').config();
const { SERVER_PORT } = process.env;

const app = express();

// middleware here
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true
	})
);

// endpoints here
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));
