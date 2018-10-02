'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list admin information
router.get('/admin', (req, res, next) => {

    let selected_link = '';
    res.render('admin', { selected_link })

});

// list admin information or redirect
router.post('/admin_home', (req, res, next) => {
    knex('admin')
    .where('admin_username', req.body.admin_username)
    .where('admin_password', req.body.admin_password)
    .then((admin) => {
        let login = admin.toString();
        // console.log('login: ' + login);
        if (login === '') {
            // console.log('here');
            let selected_link = '';
            res.redirect('admin')
        } else {
            let selected_link = 'ADMIN';
            res.render('admin_home', { admin, selected_link })
        }
    })
    .catch((err) => {
        next(err);
    });
});

// list all admin show information
router.get('/admin_shows', (req, res, next) => {
    knex('shows')
    .innerJoin('venues', 'venue_id', 'ven_id')
    .where('show_date', '>=', (knex.fn.now()))
    .orderBy('show_date', 'asc')
    .then((shows) => {
        let selected_link = 'ADMIN';
        let admin_link = 'ADMIN_SHOWS';
        res.render('admin_shows', { shows, selected_link, admin_link })
    })
    .catch((err) => {
        next(err);
    });
});

// list selected admin show after editing
router.get('/admin_shows/:id', (req, res, next) => {
    knex('shows')
    .innerJoin('venues', 'venue_id', 'ven_id')
    .where('show_id', '=', req.params.id)
    .then((shows) => {
        return knex('venues')
        .orderBy('ven_name')
        .then((venues) => {
        let selected_link = 'ADMIN';
        let admin_link;
        res.render('admin_shows', { shows, venues, selected_link, admin_link })
        })
    })
    .catch((err) => {
        next(err);
    });
});

// list selected admin show information for editing
router.get('/admin_show_edit/:id', (req, res, next) => {
    knex('shows')
    .innerJoin('venues', 'venue_id', 'ven_id')
    .where('show_id', '=', req.params.id)
    .then((shows) => {
        return knex('venues')
        .orderBy('ven_name')
        .then((venues) => {
        let selected_link = 'ADMIN';
        let admin_link;
        res.render('admin_show_edit', { shows, venues, selected_link, admin_link })
        })
    })
    .catch((err) => {
        next(err);
    });
});

// update contract record and render confirmation page
let show_update_id;
router.post('/admin_show_submit', (req, res, next) => {
  show_update_id = Number(req.body.show_id);
  console.log('show_update_id: ' + show_update_id)
  let show_date = `${req.body.show_year}-${req.body.show_month}-${req.body.show_day}`
  console.log('show_date: ' + show_date)
  let show_time = `${req.body.show_hour}:${req.body.show_minute}:00`
  console.log('show_time: ' + show_time)
  knex('shows')
    .where('show_id', Number(req.body.show_id))
    .first()
    .then((shows) => {
      if (!shows) {
        return next;
      };
      return knex('shows')
        .update({ 
          venue_id: req.body.venue_id, 
          show_date: show_date, 
          show_time: show_time, 
          show_info: req.body.show_info
        }, '*')
        .where('show_id', Number(req.body.show_id));
    })
    .then((x) => {
      res.redirect('/admin_shows/' + show_update_id);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;