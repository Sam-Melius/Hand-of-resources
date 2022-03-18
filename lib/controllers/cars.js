const { Router } = require('express');
const request = require('superagent');
const Car = require('../models/Car');

module.exports = Router()

  .post('/', async (req, res) => {
    const car = await Car.insert(req.body);
    res.send(car);
  })

;

