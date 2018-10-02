'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all shows
router.get('/shows', (req, res, next) => {
    knex('shows')
    .innerJoin('venues', 'venue_id', 'ven_id')
    .where('show_date', '>=', (knex.fn.now()))
    .orderBy('show_date', 'asc')
    .then((shows) => {
        let selected_link = 'SHOWS';
        res.render('shows', { shows, selected_link })
    })
    .catch((err) => {
        next(err);
    });
});

// list selected show
router.get('/show/:id', (req, res, next) => {
    knex('shows')
    .innerJoin('venues', 'venue_id', 'ven_id')
    .where('show_id', '=', req.params.id)
    .then((shows) => {
        let selected_link = '';
        res.render('shows', { shows, selected_link })
    })
    .catch((err) => {
        next(err);
    });
});

module.exports = router;