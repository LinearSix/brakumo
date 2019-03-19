'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all press entries
router.get('/media', (req, res, next) => {
  knex('press')
  .orderBy('press_date', 'desc')
  .then((media) => {
      let selected_link = 'MEDIA';
      res.render('media', { media, selected_link })
  })
  .catch((err) => {
      next(err);
  });
});

module.exports = router;