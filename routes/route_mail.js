'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all assassins
router.get('/mail', (req, res, next) => {

  let selected_link = 'MAIL';
  res.render('mail', { selected_link })
});

// add fan to the mailing list, return their id, and render confirmation page
let mail_insert_id;
router.post('/mail_submit', (req, res, next) => {
  knex.transaction(function(t) {
    return knex('mailing_list')
    .transacting(t)
    .returning('mail_id')
    .insert({
        mail_name: req.body.mail_name, 
        mail_email: req.body.mail_email, 
        mail_state: req.body.mail_state, 
        mail_preference_1: req.body.mail_preference_1, 
        mail_preference_2: req.body.mail_preference_2
    })
    .then((resp) => {
        mail_insert_id = Number(resp);
    })
    .then(t.commit)
    .then(() => {
        let selected_link = 'MAIL';
        return knex('mailing_list')
        .where('mail_id', mail_insert_id)
        .then((mailing_list) => {
        res.render('mail_confirm', { selected_link, mailing_list });
        })
    })
    .catch((err) => {
        t.rollback();
        throw err;
    })
    .then(() => {
    console.log('it worked');
    })
    .catch((err) => {
    console.log('it failed', err);
    })
  })
});

module.exports = router;