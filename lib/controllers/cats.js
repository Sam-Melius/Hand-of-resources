const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()

  .post('/', async (req, res) => {
    const cat = await Cat.insert(req.body);
    res.send(cat);
  })

  .get('/', async (req, res) => {
    const cats = await Cat.findAll();
    res.send(cats);
  })

  .get('/:id', async (req, res) => {
    const cat = await Cat.findById(req.params.id);
    res.send(cat);
  })
;