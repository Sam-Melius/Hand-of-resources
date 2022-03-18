const { Router } = require('express');
const request = require('superagent');
const Car = require('../models/Car');

module.exports = Router()

  .post('/', async (req, res) => {
    const car = await Car.insert(req.body);
    res.send(car);
  })

  .get('/', async (req, res) => {
    const car = await Car.findAll();
    res.send(car);
  })

  .get('/:id', async (req, res) => {
    const car = await Car.findById(req.params.id);
    res.send(car);
  })

;

