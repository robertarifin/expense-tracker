const express = require('express');
const app = express();
const port = 3000;
const homeRoutes = require('./routes/index');
const memberRoutes = require('./routes/member');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/views'));

app.use('/', homeRoutes);
app.use('/member/', memberRoutes);

app.use(session({
    secret: 'Robert and Desy',
}));

app.get('/*', (req, res) => {
    res.render('./pages/404error.ejs');    
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})