const express = require('express');
const app = express();
const fetch = require('node-fetch');

const path = require('path');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    // res.render("about", { layout: false });
    fetch(`https://api.coinranking.com/v1/public/coins`)
        .then(res => res.json())
        .then(json => console.log(json.status));
});

app.listen(6050, console.log("Listening . . ."));