const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
 

const PORT = process.env.PORT || 3000;

const routes = require('./routes');
const DbConnect = require('./database');

app.use(express.json());
app.use(cookieParser());

// Database connection
DbConnect();

app.use(cors());

// Routes 
app.use(routes);

// 404 Page
app.use((req, res, next) => {
    res.send('<h1> Error:404, Page not found </h1>');
 });


// Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '../frontend/views'));
app.set('view engine', 'ejs');



app.listen(PORT, (req, res) =>{
    console.log(`Listning on PORT: ${PORT}`);
})
