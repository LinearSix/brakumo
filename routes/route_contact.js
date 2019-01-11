'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// const knex = require('./db/knex');

// list all assassins
router.get('/contact', (req, res, next) => {

  let selected_link = 'CONTACT';
  res.render('contact', { selected_link })
});

// POST route from contact form
router.post('/contact_submit', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'davie@brandtprecision.com', // get this into an environment variable!
      pass: 'JunkAccount001' // get this into an environment variable!
    }
  });

  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: 'davie@drumbas.com',
    subject: 'New message from contact form at drumbas.com',
    text: `Name: ${req.body.name}\r\nEmail: ${req.body.email}\r\nSays: ${req.body.comment}`
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      let selected_link = 'CONTACT';
      res.render('contact_failure', { selected_link });
    }
    else {
      let selected_link = 'CONTACT';
      res.render('contact_success', { selected_link });
    }
  });
});

module.exports = router;