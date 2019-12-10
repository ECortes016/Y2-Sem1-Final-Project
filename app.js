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

app.get('/cryptocurrency', async (req, res) => {
    try {
        coinData = await fetch(`https://api.coinranking.com/v1/public/coins`);

        const json = await coinData.json();
        // console.log(json);
        const [...coins] = json.data.coins
        // console.log("coin", data);
        res.render('cryptocurrency', {
            coin: coins
        })
    } catch (error) {
        console.log(error)
    }
});

app.get('/cryptocurrency/coin-info/:coin_id', async (req, res) => {
    try {
        coinData = await fetch(`https://api.coinranking.com/v1/public/coin/${req.params.coin_id}`);

        const json = await coinData.json();
        // console.log(json);


        const { ...data } = json.data;

        res.render('coin-info', {
            name: data.coin.name,
            description: data.coin.description,
            image: data.coin.iconUrl,
            price: data.coin.price,
            rank: data.coin.rank,
            sign: data.base.sign,
            symbol: data.base.symbol,
            socials: data.coin.socials,
            // api: "Coinranking"
        })
    } catch (error) {
        console.log(error)
    };
});

app.get('/shiba', async (req, res) => {
    try {
        shibuData = await fetch(`http://shibe.online/api/shibes?count=[1-100]&urls=true`);

        const json = await shibuData.json();
        const [...image] = json;

        res.render('shiba', {
            image: image,
        })
    } catch (error) {
        
    }
});

app.listen(2002);