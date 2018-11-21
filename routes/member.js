const routes = require('express').Router();
const MemberController = require('../controllers/MemberController');

routes.get('/register', (req, res) => {
    res.render('./pages/register.ejs');    
});

routes.post('/register', MemberController.addUser);

routes.get('/login', (req, res) => {
    res.render('./pages/login.ejs', {msg: req.query.info});    
});

routes.post('/login', MemberController.loginAuth);


module.exports = routes