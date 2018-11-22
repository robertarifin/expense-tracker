const express = require('express');
const app = express();
const port = 3000;
const homeRoutes = require('./routes/index');
const memberRoutes = require('./routes/member');
const session = require('express-session');
const transactionRoutes = require('./routes/transaction');
const formatCurrency = require('./helpers/formatCurrency');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/views'));

app.use(session({
    secret: 'Robert and Desy',
    cookie: { secure: false }
}));

app.use(function (req, res, next) {
    res.locals.session = req.session;
    res.locals.formatCurrency = formatCurrency;
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