'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all blogs
router.get('/blog', (req, res, next) => {
  knex('blogs')
  .innerJoin('shows', 'blog_show_id', 'show_id')
  .orderBy('blog_date', 'desc')
  .then((blogs) => {
      let selected_link = 'BLOG';
      res.render('blog', { blogs, selected_link })
  })
  .catch((err) => {
      next(err);
  });
});

module.exports = router;