const express = require('express');
const bodyParser = require('express').json;
const api = require('./routes/api');
const app = express();
app.use(bodyParser());
app.use('/api', api);
const port = process.env.PORT || 3000;
app.listen(port);
module.exports = app;
