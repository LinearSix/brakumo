'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bodyParser = require('body-parser');
const request = require('request');
const nodemailer = require('nodemailer');
const Recaptcha = require('express-recaptcha').Recaptcha;
// site
// 6Lc48YkUAAAAAAG4jE9diZsLaW8ktyE4Sr0a6Ucy
// sec
// 6Lc48YkUAAAAAHSWF_kgVAaOspjeFKmGFtE9NGgD

// render empty contact page
router.get('/contact', (req, res) => {
  let selected_link = 'CONTACT';
  res.render('contact', { selected_link });
});

router.post('/contact_submit', (req, res) => {
  console.log(`g-recaptcha-response: ${req.body["g-recaptcha-response"]}`);
  let captcha = req.body["g-recaptcha-response"];
  if(
    captcha === undefined ||
    captcha === '' ||
    captcha === null
  ){
    let selected_link = 'CONTACT_FAILURE'
    res.render('contact', { selected_link })
  }

  // Secret Key and Verify URL
  const secretKey = '6Lc48YkUAAAAAHSWF_kgVAaOspjeFKmGFtE9NGgD';
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;
  console.log(`verifyUrl: ${verifyUrl}`);
  
  // Make Request To VerifyURL
  request(verifyUrl, (err, response, verifyBody) => {
    verifyBody = JSON.parse(verifyBody);
    console.log(`recaptchaBody: ${verifyBody}`);

    // If Not Successful
    if(verifyBody.success !== undefined && !verifyBody.success){
      let selected_link = 'CONTACT_FAILURE'
    res.render('contact', { selected_link })
    } else {
      // If successful, send the mail
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
        // text: `Name: ${req.body.name}\r\nEmail: ${req.body.email}\r\nSays: ${req.body.comment}`,
        html: `<div style="width: 50vw; 
          text-align: center; 
          height: 100%; 
          font-size: 50px; 
          color: red; 
          background: black;">
          ${req.body.name}<br />
          ${req.body.email}<br />
          ${req.body.comment}
          </div>` // ({path: './mail_format.html'})
      };

      smtpTrans.sendMail(mailOpts, function (error, response) {
        if (error) {
          let selected_link = 'CONTACT_FAILURE';
          res.render('contact', { selected_link });
        }
        else {
          let selected_link = 'CONTACT_SUCCESS';
          res.render('contact', { selected_link });
        }
      });
      let selected_link = 'CONTACT_SUCCESS';
      res.render('contact', { selected_link });
    };
  });
});

module.exports = router;