'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all assassins
router.get('/merch', (req, res, next) => {

  let selected_link = 'MERCH';
  res.render('merch', { selected_link })
  });

module.exports = router;