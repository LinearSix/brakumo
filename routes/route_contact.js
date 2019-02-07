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
  if(
    req.body.captcha === undefined ||
    req.body.captcha === '' ||
    req.body.captcha === null
  ){
    return res.json({"success": false, "msg1": "Please select captcha", "msg2": "Unless you truly are an evil robot"});
  }

  // Secret Key and Verify URL
  const secretKey = '6Lc48YkUAAAAAHSWF_kgVAaOspjeFKmGFtE9NGgD';
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;
  console.log(`verifyUrl: ${verifyUrl}`);
  
  // Make Request To VerifyURL
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);
    console.log(body);

    // If Not Successful
    if(body.success !== undefined && !body.success){
      return res.json({"success": false, "msg1": "We're Sorry", "msg2": "Something went wrong. Please email us directly."});
    }

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

    let messageHTML = `<html><head></head><body><table style="border: solid, red, 10px;"><tr><td>${req.body.name}</td><td>${req.body.email}</td><td>${req.body.comment}</td></tr></table></body></html>`
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
        console.log(selected_link);
        return res.json({"success": false, "msg1": "We're Sorry", "msg2": "Something went wrong. Please email us directly."});
      }
      else {
        let selected_link = 'CONTACT_SUCCESS';
        console.log(selected_link);
        return res.json({"success": true, "msg1": "Thank You!", "msg2": "Someone will contact you shortly."});
      }
    });
    return res.json({"success": true, "msg1": "Thank You!", "msg2": "Someone will contact you shortly."});
  });
});

module.exports = router;