const express = require('express');
const app = express();
const port = 3000;
const homeRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.use('/', homeRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})