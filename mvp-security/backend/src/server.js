const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./routes/api');
const app = express();
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

const distPath = path.resolve(process.cwd(), 'frontend/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    return res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.json({ status: 'ok', version: '0.1.0', name: 'LogShield MVP' }));
}

app.use('/api', api);

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port);
}
module.exports = app;
