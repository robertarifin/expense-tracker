const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.render('./pages/login.ejs');
    // res.send(`From login routes`)
});

module.exports = routes