'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list admin information
router.get('/admin', (req, res, next) => {
    // knex('admin')
    //     .then((admin) => {
            let selected_link = 'ADMIN';
            res.render('admin', { selected_link })
        // })
        // .catch((err) => {
        //     next(err);
        // });
  });

module.exports = router;