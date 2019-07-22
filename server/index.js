const express = require('express');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();

const checkForSession = require('./middlewares/checkForSession');
const authController = require('./controllers/authController');
const transcriptController = require('./controllers/transcriptController');

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

// middleware here
app.use(express.json());
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: true
	})
);
app.use(checkForSession);

// setup massive
massive(CONNECTION_STRING).then(db => {
	app.set('db', db);
	console.log('connected to db');
});

// auth endpoints
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.post('/api/logout', authController.logout);
app.get('/api/user', authController.getUser);

// transcriptor endpoints
app.post('/api/fetch', transcriptController.fetch);
app.post('/api/cache', transcriptController.cacheTranscript);

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));
