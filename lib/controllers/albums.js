const { Router } = require('express');
const Album = require('../models/Album');

module.exports = Router()

  .post('/', async (req, res) => {
    const album = await Album.insert(req.body);
    res.send(album);
  })

  .get('/', async (req, res) => {
    const albums = await Album.findAll();
    res.send(albums);
  })

  .get('/:id', async (req, res) => {
    const album = await Album.findById(req.params.id);
    res.send(album);
  })

  .delete('/:id', async (req, res) => {
    const album = await Album.deleteById(req.params.id);
    res.send(album);
  })
    
;
