const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/', routes)

app.listen(8000, () => {
    console.log('server running at port 8000')
})