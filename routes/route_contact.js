'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all assassins
router.get('/contact', (req, res, next) => {

  let selected_link = 'CONTACT';
  res.render('contact', { selected_link })
  });

module.exports = router;