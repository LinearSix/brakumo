'use strict';

const express = require('express');
const router = express.Router();
// const knex = require('../db/knex');

    let show = [{
        date: "01/23/2019",
        time: "9:00pm",
        ven_name: "CBGB's",
        city: "New York",
        state: "New York",
        ticket_link: "NA"
    }, 
    {
        date: "01/23/2019",
        time: "9:00pm",
        ven_name: "CBGB's",
        city: "New York",
        state: "New York",
        ticket_link: "NA"
    },
    {
        date: "01/23/2019",
        time: "9:00pm",
        ven_name: "CBGB's",
        city: "New York",
        state: "New York",
        ticket_link: "NA"
    }];
// render the home page
router.get('/', (req, res, next) => {
  
    res.render('index', { show });

});

module.exports = router;