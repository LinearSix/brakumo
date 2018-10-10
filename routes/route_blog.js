'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all blogs
router.get('/blog', (req, res, next) => {
  knex.from('blogs')
    .orderBy('blog_date', 'desc')
    .then((blogs) => {
      return knex.from('shows')
      .innerJoin('venues', 'venue_id', 'ven_id')
      .orderBy('show_date', 'desc')
      .then((shows) => {
        let selected_link = 'BLOG';
        res.render('blog', { blogs, shows, selected_link });
      })
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;