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

// render basic fanmail page
router.get('/admin_fanmail', (req, res, next) => {
  knex('mailing_list')
  .orderBy('mail_name', 'asc')
  .then((mailing_list) => {
      let selected_link = 'ADMIN';
      let admin_link = 'ADMIN_FANMAIL';
      res.render('admin_fanmail', { mailing_list, selected_link, admin_link })
  })
  .catch((err) => {
      next(err);
  });
});

// sort by name
router.get('/admin_fanmail/name', (req, res, next) => {
  knex('mailing_list')
  .orderBy('mail_name', 'asc')
  .then((mailing_list) => {
      let selected_link = 'ADMIN';
      let admin_link = 'ADMIN_FANMAIL';
      res.render('admin_fanmail', { mailing_list, selected_link, admin_link })
  })
  .catch((err) => {
      next(err);
  });
});

// sort by email
router.get('/admin_fanmail/email', (req, res, next) => {
  knex('mailing_list')
  .orderBy('mail_email', 'asc')
  .then((mailing_list) => {
      let selected_link = 'ADMIN';
      let admin_link = 'ADMIN_FANMAIL';
      res.render('admin_fanmail', { mailing_list, selected_link, admin_link })
  })
  .catch((err) => {
      next(err);
  });
});

// sort by state
router.get('/admin_fanmail/state', (req, res, next) => {
  knex('mailing_list')
  .orderBy('mail_state', 'asc')
  .then((mailing_list) => {
      let selected_link = 'ADMIN';
      let admin_link = 'ADMIN_FANMAIL';
      res.render('admin_fanmail', { mailing_list, selected_link, admin_link })
  })
  .catch((err) => {
      next(err);
  });
});

// sort by preference
router.get('/admin_fanmail/preference', (req, res, next) => {
  knex('mailing_list')
  .orderBy('mail_preference_1', 'asc')
  .then((mailing_list) => {
      let selected_link = 'ADMIN';
      let admin_link = 'ADMIN_FANMAIL';
      res.render('admin_fanmail', { mailing_list, selected_link, admin_link })
  })
  .catch((err) => {
      next(err);
  });
});

// send the mail
router.post('/admin_fanmail_submit', (req, res) => {
  console.log(`g-recaptcha-response: ${req.body["g-recaptcha-response"]}`);
  let captcha = req.body["g-recaptcha-response"];
  if(
    captcha === undefined ||
    captcha === '' ||
    captcha === null
  ){
    let selected_link = 'FANMAIL_FAILURE'
    let admin_link = 'ADMIN_FANMAIL';
    res.render('admin_fanmail', { selected_link, admin_link })
  }

  // Secret Key and Verify URL
  const secretKey = process.env.SECRET_CAPTCHA;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;
  console.log(`verifyUrl: ${verifyUrl}`);

  // grab the current show list for the email
  function getShows() {
    let dataArr =[];
    return knex('shows')
    .innerJoin('venues', 'venue_id', 'ven_id')
    .where('show_date', '>=', (knex.fn.now()))
    .orderBy('show_date', 'asc')
       .then(function(shows) {
           shows.forEach(function(value) {
              dataArr.push(value)
           });
           return dataArr;
       });
  }

  //  prepare the HTML content
  let showsHTML = ``;
  let showTime = '';
  async function returnedShows() {
    let showData = await getShows();
    // console.log(`ALL DATA: ${showData}`);
    for (let i = 0; i < showData.length; i++) {
      if (showData[i].show_time.substring(0, 2) > 12) {
        showTime = `${parseInt(Number(showData[i].show_time.substring(0, 2)) - 12, 10)}:${showData[i].show_time.substring(3, 5)}pm`;
      } else {
        showTime = `${parseInt(showData[i].show_time.substring(0, 2), 10)}:${showData[i].show_time.substring(3, 5)}am`;
      };
      showsHTML = showsHTML + `<p><a href="www.drumbas.com/shows/${showData[i].show_id}">${showData[i].show_date.toDateString()} at ${showData[i].ven_name}</a><br />${showTime}<br />${showData[i].show_info}`
      console.log(`showsHTML: ${showsHTML}`);
    };
  };
  returnedShows();

  // grab the recipient list for the email
  function getFans() {
    let fansArr =[];
    return knex('mailing_list')
    // .where('show_date', '>=', (knex.fn.now()))
    .orderBy('mail_name', 'asc')
       .then(function(fans) {
           fans.forEach(function(fanValue) {
              fansArr.push(fanValue)
           });
           return fansArr;
       });
  };

  //  prepare the recipient list array
  let fansHTML = [];
  async function returnedFans() {
    let fansData = await getFans();
    // console.log(`ALL DATA: ${showData}`);
    for (let i = 0; i < fansData.length; i++) {
      fansHTML.push(fansData[i].mail_email);
      console.log(`fansHTML: ${fansHTML}`);
    };
  };
  returnedFans();
  
  // Make Request To VerifyURL
  request(verifyUrl, (err, response, verifyBody) => {
    verifyBody = JSON.parse(verifyBody);
    console.log(`recaptchaBody: ${verifyBody}`);

    // If Not Successful
    if(verifyBody.success !== undefined && !verifyBody.success){
      let selected_link = 'CONTACT_FAILURE'
    res.render('contact', { selected_link })
    } else {
    // Captcha was successful, send the mail


      let mailOpts, smtpTrans;
      smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.VAR_USER, // get this into an environment variable!
          pass: process.env.VAR_PASS // get this into an environment variable!
        }
      });

      for (let j = 0; j < fansHTML.length; j++) {
        console.log(`email sent to ${fansHTML[j]}`)
        mailOpts = {
          from: 'Brakumo' + ' &lt;' + 'davie@drumbas.com' + '&gt;',
          to: fansHTML[j],
          subject: 'Brakumo News!',
          // text: `Name: ${req.body.name}\r\nEmail: ${req.body.email}\r\nSays: ${req.body.comment}`,
          html: 
          `<table style="width: 80vw; border: 0px;">
            <tr>
              <td style="font-family: 'Asche', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; 
              text-align: center; 
              height: 100%; 
              font-size: 50px; 
              color: white; 
              background: black;">
              BRAKUMO NEWS!
              </td>
            </tr>
            <tr>
              <td style="font-family: 'Avenir', 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; 
              text-align: center; 
              height: 100%; 
              font-size: 16px; 
              color: black; 
              background: grey;">
              ${showsHTML}
              </td>
            </tr>
            <tr>
              <td style="font-family: 'Avenir', 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; 
              text-align: center; 
              height: 100%; 
              font-size: 16px; 
              color: black; 
              background: grey;">
              <img src="http://www.drumbas.com/drumbas_complete_01_small.jpg" />
              </td>
            </tr>
            <tr>
              <td style="font-family: 'Avenir', 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; 
              text-align: center; 
              height: 100%; 
              font-size: 16px; 
              color: black; 
              background: grey;">
              ${req.body.name}<br />
              ${req.body.email}<br />
              ${req.body.comment}<br />
              </td>
            </tr>
          </table>` 
          // ({path: 'email-dist/two.template.html'})
        };

        smtpTrans.sendMail(mailOpts, function (error, response) {
          // WHAT SHOULD HAPPEN ON FAILURE?
          // DOES NODEMAILER HAVE ANYTHING BUILT IN FOR MULTIPLE RECIPIENTS?
          // if (error) {
          //   let selected_link = 'CONTACT_FAILURE';
          //   res.render('contact', { selected_link });
          // }
          // else {
          //   let selected_link = 'CONTACT_SUCCESS';
          //   res.render('contact', { selected_link });
          // }
        });
      };
      let selected_link = 'ADMIN';
      let admin_link = 'ADMIN_FANMAIL'
      res.render('admin', { selected_link, admin_link });
    };
  });
});

module.exports = router;