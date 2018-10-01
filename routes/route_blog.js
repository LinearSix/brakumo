'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all assassins
router.get('/blog', (req, res, next) => {

            let selected_link = 'BLOG';
            res.render('blog', { selected_link })
  });

module.exports = router;