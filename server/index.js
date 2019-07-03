const express = require('express');
require('dotenv').config();
const { SERVER_PORT } = process.env;

const app = express();

// endpoints here

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));
