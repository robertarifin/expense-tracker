const express = require('express');
const app = express();
const port = 3000;
var cookieSession = require('cookie-session')
// const session = require('express-session');
const homeRoutes = require('./routes/index');
const memberRoutes = require('./routes/member');
const transactionRoutes = require('./routes/transaction');
const formatCurrency = require('./helpers/formatCurrency');
const styling = require('./helpers/styling');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/views'));

app.use(cookieSession({
    name: 'session',
    keys: ['Robert and Desy'],
    // secret: 'Robert and Desy',
    // cookie: { secure: false }
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
//testing restart server

app.use(function (req, res, next) {
    res.locals.session = req.session;
    res.locals.formatCurrency = formatCurrency;
    res.locals.styling = styling;
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
    next();
});

// routes
app.use('/', homeRoutes);
app.use('/member/', memberRoutes);
app.use('/transaction', transactionRoutes)
app.get('/*', (req, res) => {
    res.render('./pages/404error.ejs');    
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})