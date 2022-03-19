const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.get('/', (req, res) => {
  res.send('Hit root Route');
});

app.use('/api/v1/cats', require('./controllers/cats'));
app.use('/api/v1/albums', require('./controllers/albums'));
app.use('/api/v1/games', require('./controllers/games'));
app.use('/api/v1/cars', require('./controllers/cars'));
app.use('/api/v1/shows', require('./controllers/shows'));



// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
