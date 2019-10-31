const conm = require('express').Router();
const v1 = require('./v1');

conm.use('/v1', v1);

module.exports = conm