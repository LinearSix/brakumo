const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 2500;
require('dotenv').config()
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');
const tumblr = require('tumblr.js');
// const knex = require('./db/knex');

// use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the folder for ejs files
// app.set('views', path.join(__dirname, 'views'));

// trying handlebars for nodemailer test
// app.engine('handlebars', exphbs())
// app.set('view engine', 'handlebars');

// Set the folder for public content
app.use(express.static(path.join(__dirname, 'public')))

// set the folder for npm packages
app.use(express.static(path.join(__dirname, 'node_modules')))

// set the favicon file
app.use(favicon(path.join(__dirname,'public','favicon.ico')));

// Set the view engine to ejs
app.set('view engine', 'ejs')

// set express routes
const index = require('./routes');
const route_shows = require('./routes/route_shows');
const route_drumbas = require('./routes/route_drumbas');
const route_merch = require('./routes/route_merch');
const route_contact = require('./routes/route_contact');
const route_media = require('./routes/route_media');
const route_gallery = require('./routes/route_gallery');
const route_mail = require('./routes/route_mail');
const route_tumblr = require('./routes/route_tumblr');
const route_admin = require('./routes/route_admin');
const route_admin_fanmail = require('./routes/route_admin_fanmail');
const route_admin_send_mail = require('./routes/route_admin_send_mail');

// use express routes
app.use(index);
app.use(route_shows);
app.use(route_drumbas);
app.use(route_merch);
app.use(route_contact);
app.use(route_media);
app.use(route_gallery);
app.use(route_mail);
app.use(route_tumblr);
app.use(route_admin);
app.use(route_admin_fanmail);
app.use(route_admin_send_mail);

// set redirect for users adding a /
app.get('/', function(req, res){ res.redirect('index')});

app.use((_req, res) => {
    res.sendStatus(404);
});
  
app.use((err, _req, res, _next) => {
if (err.status) {
    return res
    .status(err.status)
    .set('Content-Type', 'text/plain')
    .send(err.message);
}

console.error(err.stack);
res.sendStatus(500);
});
  
// start server
app.listen(PORT, function() {
console.log("listening on port: ", PORT);
});

module.exports = app;