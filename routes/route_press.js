'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all assassins
router.get('/press', (req, res, next) => {

  let selected_link = 'PRESS';
  res.render('press', { selected_link })
  });

module.exports = router;