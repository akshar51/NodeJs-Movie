const express = require('express');
const db = require('./configs/db');
const path = require('path')
const app = express();
const port = 3000;

app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'))
app.use('/uploads',express.static((__dirname,'uploads')))

app.use('/',require('./routers/movie'))
app.use('/',require('./routers/trailers'))

app.listen(port, (err) => {
    if (!err) {
        db()
        console.log("Server started...");
        console.log("http://localhost:" + port);
    }
});
