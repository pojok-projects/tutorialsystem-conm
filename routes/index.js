const express = require('express');
const conm = require('./conm');

const Router = express();

const bodyParser = require('body-parser');
Router.use(bodyParser.json())

const cors = require('cors');
Router.use(cors());

Router.use('/conm', conm)

Router.all('/*', (req, res) => {
    res.status(422).send({
        code: 422,
        path: req.originalUrl,
        method: req.method,
        message: "Invalid Request"
    })
})

// Default Error Fallback
Router.use((error, req, res, next) => {
    return res.status(422).send({
        status: {
            code: 422,
            message: error.message,
            succeeded: false
        }
    });
});

module.exports = Router