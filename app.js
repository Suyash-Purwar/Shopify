const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const shopRoutes = require('./router/shop');
const adminRoutes = require('./router/admin');
const errorController = require('./controllers/error');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
    console.log('Listening to requests');
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', errorController.get404);

app.listen(port);