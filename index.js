const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'))

app.use('/',require('./routers/movie'))

app.listen(port, (err) => {
    if (!err) {
        console.log("Server started...");
        console.log("http://localhost:" + port);
    }
});
