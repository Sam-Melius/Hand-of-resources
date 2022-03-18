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
    
;
