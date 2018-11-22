const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.render('./pages/home.ejs',  {errorMessage: req.query.info || ''});
    // res.send('from routes home');
})

module.exports = routes;