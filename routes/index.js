const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('from routes home');
})

module.exports = routes;