'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all blogs
router.get('/drumbas', (req, res, next) => {
  knex.from('blogs')
    .orderBy('blog_date', 'desc')
    .then((blogs) => {
      return knex.from('shows')
      .innerJoin('venues', 'venue_id', 'ven_id')
      .orderBy('show_date', 'desc')
      .then((shows) => {
        let selected_link = 'DRUMBAS';
        res.render('drumbas', { blogs, shows, selected_link });
      })
    })
    .catch((err) => {
      next(err);
    });
});

// list all blogs
router.get('/drumbas/:id', (req, res, next) => {
    knex.from('blogs')
      .where('blog_id', '=', req.params.id)
      .then((blogs) => {
        return knex.from('shows')
        .innerJoin('venues', 'venue_id', 'ven_id')
        .orderBy('show_date', 'desc')
        .then((shows) => {
          let selected_link = 'DRUMBAS';
          res.render('drumbas', { blogs, shows, selected_link });
        })
      })
      .catch((err) => {
        next(err);
      });
  });

module.exports = router;