const express = require('express');
const api = require('./routes/api');
const app = express();
app.use('/api', api);
app.get('/', (req, res) => res.json({ status: 'ok', version: '0.1.0', name: 'LogShield MVP' }));
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port);
}
module.exports = app;
