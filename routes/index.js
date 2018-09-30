'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all assassins
router.get('/index', (req, res, next) => {
    knex('shows')
        .innerJoin('venues', 'venue_id', 'ven_id')
        .orderBy('show_date', 'asc')
        .then((shows) => {
            res.render('index', { shows })
        })
        .catch((err) => {
            next(err);
        });
  });

module.exports = router;