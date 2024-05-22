import express from 'express';
import routes from './routes';

const expressLayout = require('express-ejs-layouts')

const app = express();

app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.use(expressLayout);

// app.set('views', path.join(__dirname, 'views'));

app.use(routes);
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server running on port ', 3000);
})