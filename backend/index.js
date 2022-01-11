const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes');

app.use(express.json());
app.use(routes);
app.use((req, res, next) => {
    res.send('<h1> Error:404, Page not found </h1>');
 });

app.listen(PORT, (req, res) =>{
    console.log(`Listning on PORT: ${PORT}`);
})