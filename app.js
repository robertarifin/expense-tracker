const express = require('express');
const app = express();
const port = 3000;
const homeRoutes = require('./routes/index');
const transactionRoutes = require('./routes/transaction')

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.use('/', homeRoutes);
app.use('/transaction', transactionRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})