const routes = require('express').Router();
const MemberController = require('../controllers/MemberController');

routes.get('/register', (req, res) => {
    res.render('./pages/register.ejs', {errorMessage: req.query.info || ''});    
});

routes.post('/register', MemberController.addUser);

routes.get('/login', (req, res) => {
    res.render('./pages/login.ejs', {errorMessage: req.query.info || ''});    
});

routes.post('/login', MemberController.loginAuth);

routes.get('/logout', MemberController.logout);


module.exports = routes