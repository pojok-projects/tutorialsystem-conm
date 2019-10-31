const Router = require('express').Router();
const {
    metadata
} = require('../../../controllers');

Router.get('/', metadata.index)
Router.get('/:id', metadata.get)
Router.post('/store', metadata.validate('store'), metadata.store)
Router.post('/update/:id', metadata.update)
Router.get('/delete/:id', metadata.delete)

module.exports = Router