'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all press entries
router.get('/gallery', (req, res, next) => {

    let selected_link = ''
    res.render('gallery', { selected_link })

});

module.exports = router;