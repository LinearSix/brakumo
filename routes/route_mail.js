'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all assassins
router.get('/mail', (req, res, next) => {

  let selected_link = 'MAIL';
  res.render('mail', { selected_link })
  });

module.exports = router;