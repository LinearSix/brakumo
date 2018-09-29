const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 1666;
const bodyParser = require('body-parser');
const knex = require('./db/knex');