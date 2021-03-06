const { Router } = require('express');
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

  .delete('/:id', async (req, res) => {
    const car = await Car.deleteById(req.params.id);
    res.send(car);
  })

  .patch('/:id', async (req, res) => {
    const car = await Car.updateById(req.params.id, req.body);
    res.send(car);
  })

;

