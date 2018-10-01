'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all press entries
router.get('/press', (req, res, next) => {
  knex('press')
  .orderBy('press_date', 'desc')
  .then((press) => {
      let selected_link = 'PRESS';
      res.render('press', { press, selected_link })
  })
  .catch((err) => {
      next(err);
  });
});

module.exports = router;