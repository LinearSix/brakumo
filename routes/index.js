'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all assassins
router.get('/index', (req, res, next) => {
    knex('shows')
        .innerJoin('venues', 'venue_id', 'ven_id')
        .where('show_date', '>=', (knex.fn.now()))
        .orderBy('show_date', 'asc')
        .then((shows) => {
            let selected_link = 'HOME';
            res.render('index', { shows, selected_link })
        })
        .catch((err) => {
            next(err);
        });
  });

module.exports = router;