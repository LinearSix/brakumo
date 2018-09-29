'use strict';

const express = require('express');
const router = express.Router();
// const knex = require('../db/knex');

// render the home page
router.get('/', (req, res, next) => {
  
    res.render('index')

});

module.exports = router;