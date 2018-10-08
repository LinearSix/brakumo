'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list admin information
router.get('/admin', (req, res, next) => {

    let selected_link = '';
    res.render('admin', { selected_link })

});

// ######################################################################
// ######################### ADMIN LOGIN ################################
// ######################################################################

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
            let admin_link = '';
            res.redirect('admin', { selected_link })
        } else {
            let selected_link = 'ADMIN';
            let admin_link = '';
            res.render('admin_home', { admin, selected_link, admin_link })
        }
    })
    .catch((err) => {
        next(err);
    });
});

// ######################################################################
// ######################### VENUE ADMIN ################################
// ######################################################################

// list all admin show information
router.get('/admin_venues', (req, res, next) => {
    knex('venues')
    .orderBy('ven_name', 'asc')
    .then((venues) => {
        let selected_link = 'ADMIN';
        let admin_link = 'ADMIN_VENUES';
        res.render('admin_venues', { venues, selected_link, admin_link })
    })
    .catch((err) => {
        next(err);
    });
});

// ######################### CREATE VENUE ################################

// render page for adding a venue
router.get('/admin_venue_add', (req, res, next) => {

    let selected_link = 'ADMIN';
    let admin_link = '';
    res.render('admin_venue_add', { selected_link, admin_link })

});

// insert new venue into db
let venue_insert_id;
router.post('/admin_venue_submit', (req, res, next) => {
  knex.transaction(function(t) {
      return knex('venues')
      .transacting(t)
      .returning('ven_id')
      .insert({
        ven_name: req.body.ven_name, 
        ven_address_1: req.body.ven_address_1, 
        ven_address_2: req.body.ven_address_2, 
        ven_city: req.body.ven_city, 
        ven_state: req.body.ven_state,
        ven_postal: req.body.ven_postal,
        ven_phone: req.body.ven_phone,
        ven_web: req.body.ven_web,
        ven_desc: req.body.ven_desc
      })
      .then((resp) => {
          venue_insert_id = Number(resp);
      })
      .then(t.commit)
      .then(() => {
          // console.log(assassin_id);
          res.redirect('/admin_venues/' + venue_insert_id);
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

// ######################### UPDATE VENUE ################################

// list selected venue after selecting for update
router.get('/admin_venues/:id', (req, res, next) => {
    knex('venues')
    .where('ven_id', '=', req.params.id)
    .then((venues) => {
        let selected_link = 'ADMIN';
        let admin_link;
        res.render('admin_venues', { venues, selected_link, admin_link })
    })
    .catch((err) => {
        next(err);
    });
});

// list selected venue information for editing
router.get('/admin_venue_edit/:id', (req, res, next) => {
    knex('venues')
    .where('ven_id', '=', req.params.id)
    .then((venues) => {
        let selected_link = 'ADMIN';
        let admin_link;
        res.render('admin_venue_edit', { venues, selected_link, admin_link })
    })
    .catch((err) => {
        next(err);
    });
});

// update venue record and render confirmation page
let venue_update_id;
router.post('/admin_venue_update', (req, res, next) => {
  venue_update_id = Number(req.body.ven_id);
  console.log('venue_update_id: ' + venue_update_id)
  knex('venues')
    .where('ven_id', Number(req.body.ven_id))
    .first()
    .then((venues) => {
      if (!venues) {
        return next;
      };
      return knex('venues')
        .update({ 
            ven_name: req.body.venue_id, 
            ven_address_1: req.body.ven_address_1, 
            ven_address_2: req.body.ven_address_2, 
            ven_city: req.body.show_ticket_link, 
            ven_state: req.body.show_info,
            ven_postal: req.body.ven_postal,
            ven_phone: req.body.ven_phone,
            ven_web: req.body.ven_web,
            ven_desc: req.body.ven_desc
        }, '*')
        .where('ven_id', Number(req.body.ven_id));
    })
    .then((x) => {
        let selected_link = 'ADMIN';
        let admin_link = "ADMIN_VENUES";
      res.redirect('/admin_venues/' + venue_update_id, selected_link, admin_link );
    })
    .catch((err) => {
      next(err);
    });
});

// ######################### DELETE VENUE ################################

// delete a show and redirect to confirmation page
router.get('/admin_venue_delete/:id', (req, res, next) => {

    let venue_row;
    
    knex('venues')
    .where('ven_id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }
      venue_row = row;
      return knex('venues')
      .del()
      .where('ven_id', req.params.id);
    })
    .then(() => {
      delete venue_row.ven_id;
        let selected_link = 'ADMIN';
        let admin_link = "ADMIN_VENUES";
      res.redirect('/admin_venues', selected_link, admin_link );
    })
    .catch((err) => {
      next(err);
    });
});

// ######################################################################
// ######################### SHOWS ADMIN ################################
// ######################################################################

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

// ######################### CREATE SHOW ################################

// render page for adding a show
router.get('/admin_show_add', (req, res, next) => {
    knex('venues')
    .orderBy('ven_name', 'asc')
    .then((venues) => {
        let selected_link = 'ADMIN';
        let admin_link = '';
        res.render('admin_show_add', { venues, selected_link, admin_link })
    })
    .catch((err) => {
        next(err);
    });
});

// insert new show into db
let show_insert_id;
router.post('/admin_show_submit', (req, res, next) => {
    let show_date = `${req.body.show_year}-${req.body.show_month}-${req.body.show_day}`;
    let show_time = `${req.body.show_hour}:${req.body.show_minute}:00`;
  knex.transaction(function(t) {
      return knex('shows')
      .transacting(t)
      .returning('show_id')
      .insert({
        venue_id: req.body.venue_id, 
        show_date: show_date, 
        show_time: show_time, 
        show_ticket_link: req.body.show_ticket_link, 
        show_info: req.body.show_info
      })
      .then((resp) => {
          show_insert_id = Number(resp);
      })
      .then(t.commit)
      .then(() => {
          // console.log(assassin_id);
          res.redirect('/admin_shows/' + show_insert_id);
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

// ######################### UPDATE SHOW ################################

// list selected show after selecting for update
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

// list selected show information for editing
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

// update show record and render confirmation page
let show_update_id;
router.post('/admin_show_update', (req, res, next) => {
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
          show_ticket_link: req.body.show_ticket_link, 
          show_info: req.body.show_info
        }, '*')
        .where('show_id', Number(req.body.show_id));
    })
    .then((x) => {
        let selected_link = 'ADMIN';
        let admin_link = "ADMIN_SHOWS";
      res.redirect('/admin_shows/' + show_update_id, selected_link, admin_link );
    })
    .catch((err) => {
      next(err);
    });
});

// ######################### DELETE SHOW ################################

// delete a show and redirect to confirmation page
router.get('/admin_show_delete/:id', (req, res, next) => {

    let show_row;
    
    knex('shows')
    .where('show_id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }
      show_row = row;
      return knex('shows')
      .del()
      .where('show_id', req.params.id);
    })
    .then(() => {
      delete show_row.show_id;
        let selected_link = 'ADMIN';
        let admin_link = "ADMIN_SHOWS";
      res.redirect('/admin_shows', selected_link, admin_link );
    })
    .catch((err) => {
      next(err);
    });
});

// ######################################################################
// ######################### BLOGS ADMIN ################################
// ######################################################################

// list all admin blog information
router.get('/admin_blogs', (req, res, next) => {
    knex('blogs')
    .innerJoin('shows', 'show_id', 'blog_show_id')
    .innerJoin('venues', 'ven_id', 'venue_id')
    .orderBy('blog_date', 'desc')
    .then((blogs) => {
        let selected_link = 'ADMIN';
        let admin_link = 'ADMIN_BLOGS';
        res.render('admin_blogs', { blogs, selected_link, admin_link })
    })
    .catch((err) => {
        next(err);
    });
});

// ######################### CREATE BLOG ################################

// render page for adding a blog entry
router.get('/admin_blog_add', (req, res, next) => {
    knex('shows')
    .innerJoin('venues', 'venue_id', 'ven_id')
    .orderBy('show_date', 'desc')
    .then((shows) => {
        let selected_link = 'ADMIN';
        let admin_link = '';
        res.render('admin_blog_add', { shows, selected_link, admin_link })
    })
    .catch((err) => {
        next(err);
    });
});

// insert new blog into db
let blog_insert_id;
router.post('/admin_blog_submit', (req, res, next) => {
    let blog_date = `${req.body.blog_year}-${req.body.blog_month}-${req.body.blog_day}`;
  knex.transaction(function(t) {
      return knex('blogs')
      .transacting(t)
      .returning('blog_id')
      .insert({
        blog_show_id: req.body.blog_show_id, 
        blog_date: blog_date, 
        blog_title: req.body.blog_title, 
        blog_content: req.body.blog_content
      })
      .then((resp) => {
          blog_insert_id = Number(resp);
      })
      .then(t.commit)
      .then(() => {
          // console.log(assassin_id);
          res.redirect('/admin_blogs/' + blog_insert_id);
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

// ######################### UPDATE BLOG ################################

// list selected show after selecting for update
router.get('/admin_blogs/:id', (req, res, next) => {
    knex('blogs')
    .innerJoin('shows', 'show_id', 'blog_show_id')
    .innerJoin('venues', 'venue_id', 'ven_id')
    .where('blog_id', '=', req.params.id)
    .then((blogs) => {
        return knex('shows')
        .orderBy('show_date', 'desc')
        .then((shows) => {
        let selected_link = 'ADMIN';
        let admin_link;
        res.render('admin_blogs', { shows, blogs, selected_link, admin_link })
        })
    })
    .catch((err) => {
        next(err);
    });
});

// list selected blog information for editing
router.get('/admin_blog_edit/:id', (req, res, next) => {
    knex('blogs')
    .innerJoin('shows', 'show_id', 'blog_show_id')
    .where('blog_id', '=', req.params.id)
    .then((blogs) => {
        return knex('shows')
        .orderBy('show_date')
        .then((shows) => {
        let selected_link = 'ADMIN';
        let admin_link;
        res.render('admin_blog_edit', { shows, blogs, selected_link, admin_link })
        })
    })
    .catch((err) => {
        next(err);
    });
});

// update show record and render confirmation page
let blog_update_id;
router.post('/admin_blog_update', (req, res, next) => {
  blog_update_id = Number(req.body.blog_id);
  console.log('blog_update_id: ' + blog_update_id)
  let blog_date = `${req.body.blog_year}-${req.body.blog_month}-${req.body.blog_day}`
  console.log('blog_date: ' + blog_date)
  knex('blogs')
    .where('blog_id', Number(req.body.blog_id))
    .first()
    .then((blogs) => {
      if (!blogs) {
        return next;
      };
      return knex('blogs')
        .update({ 
            blog_show_id: req.body.blog_show_id, 
            blog_date: blog_date, 
            blog_title: req.body.blog_title, 
            blog_content: req.body.blog_content
        }, '*')
        .where('blog_id', Number(req.body.blog_id));
    })
    .then((x) => {
        let selected_link = 'ADMIN';
        let admin_link = "ADMIN_BLOGS";
      res.redirect('/admin_blogs/' + blog_update_id, selected_link, admin_link );
    })
    .catch((err) => {
      next(err);
    });
});

// ######################### DELETE BLOG ################################

// delete a show and redirect to confirmation page
router.get('/admin_blog_delete/:id', (req, res, next) => {

    let blog_row;
    
    knex('blogs')
    .where('blog_id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }
      blog_row = row;
      return knex('blogs')
      .del()
      .where('blog_id', req.params.id);
    })
    .then(() => {
      delete blog_row.show_id;
        let selected_link = 'ADMIN';
        let admin_link = "ADMIN_BLOGS";
      res.redirect('/admin_blogs', selected_link, admin_link );
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;