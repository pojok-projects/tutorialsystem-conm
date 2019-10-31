const v1 = require('express').Router();
const metadata = require('./metadata');

v1.use('/', metadata);

module.exports = v1