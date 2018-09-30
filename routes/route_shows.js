'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all assassins
router.get('/shows', (req, res, next) => {
    knex('shows')
        .innerJoin('venues', 'venue_id', 'ven_id')
        .orderBy('show_date', 'asc')
        .then((shows) => {
            let selected_link = 'SHOWS';
            res.render('shows', { shows, selected_link })
        })
        .catch((err) => {
            next(err);
        });
  });

module.exports = router;