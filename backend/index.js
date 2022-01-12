const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
 

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



app.listen(PORT, (req, res) =>{
    console.log(`Listning on PORT: ${PORT}`);
})
