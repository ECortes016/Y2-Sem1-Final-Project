const express = require('express');
const app = express();
const fetch = require('node-fetch');
const path = require('path');
const ejs = require('ejs');
const anime = require('animejs');
// const Plotly = require('plotly.js-dist');
// npm install --save express-ejs-layouts
var expressLayouts = require('express-ejs-layouts');
ejs.delimiter = '?';

app.use(express.static('public'));
// app.use(expressLayouts)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/coin-info/:coin_id', async (req, res) => {
    try {
        coinData = await fetch(`https://api.coinranking.com/v1/public/coin/${req.params.coin_id}`);

        const json = await coinData.json();
        // console.log(json);


        // const { ...data } = json.data;
        // console.log("coin", data);
        res.render('coin-info', {
            name: json.data.coin.name,
            description: json.data.coin.description,
            image: json.data.coin.iconUrl,
            price: json.data.coin.price,
            rank: json.data.coin.rank,
            sign: json.data.base.sign,
            symbol: json.data.base.symbol,
            socials: json.data.coin.socials,
            // api: "Coinranking"
        })
    } catch (error) {
        console.log(error)
    };
});


app.get('/', async (req, res) => {
    try {
        coinData = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`);

        const json = await coinData.json();
        // console.log(json);

        // console.log("coin", data);
        res.render('index', {})
    } catch (error) {
        console.log(error)
    }
});


app.listen(2002);