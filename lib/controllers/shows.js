const { Router } = require('express');
const Show = require('../models/Show');

module.exports = Router()

  .post('/', async (req, res) => {
    const show = await Show.insert(req.body);
    res.send(show);
  })

;
