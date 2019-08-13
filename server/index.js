const express = require('express');
const session = require('express-session');
const massive = require('massive');
const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const checkForSession = require('./middlewares/checkForSession');
const authController = require('./controllers/authController');
const transcriptController = require('./controllers/transcriptController');
const searchController = require('./controllers/searchController');

const { SERVER_PORT, SESSION_SECRET, DB_CONNECTION_STRING, ELASTIC_CONNECTION } = process.env;

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
massive(DB_CONNECTION_STRING)
  .then(db => {
    app.set('db', db);
    console.log('connected to db');
  })
  .catch(err => {
    console.log('connection to db failed!!!');
    console.log(err);
  });

// setup ES connection
const esClient = new Client({ node: ELASTIC_CONNECTION });
if(esClient) {
  console.log("Connected to ElasticSearch");
  app.locals.esClient = esClient;
}

// auth endpoints
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.post('/api/logout', authController.logout);
app.get('/api/user', authController.getUser);

// transcript endpoints
app.post('/api/fetch', transcriptController.fetch);
app.post('/api/save', transcriptController.save);

// search endpoints
app.post('/api/index', searchController.index);
app.post('/api/search', searchController.search);

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));
