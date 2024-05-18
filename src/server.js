import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(routes);

app.use(express.static(path.join(__dirname, 'public')))
app.listen(3000, () => {
    console.log('Server running on port ', 3000);
})