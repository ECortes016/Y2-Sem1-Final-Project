const express = require('express');
const app = express();
const fetch = require('node-fetch');
const path = require('path');
const ejs = require('ejs');
const anime = require('animejs');
// const Plotly = require('plotly.js-dist');
// npm install --save express-ejs-layouts
// var expressLayouts = require('express-ejs-layouts');
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
            coin: coins,
            api: 'Coinranking',
            apiUrl: 'https://coinranking.com'
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
            api: 'Coinranking',
            apiUrl: 'coinranking.com'
        })
    } catch (error) {
        console.log(error)
    };
});

app.get('/shiba', async (req, res) => {
    try {
        shibuData = await fetch(`http://shibe.online/api/shibes?count=[1-100]&urls=true`);

        const shibuJson = await shibuData.json();
        const [...image] = shibuJson;

        res.render('shiba', {
            image: image,
            api: 'shibe.online',
            apiUrl: 'https://shibe.online/'
        })
    } catch (error) {

    }
});

app.get('/weather', async (req, res) => {
    try {
        // let lat;
        // let long;
        // weatherData = await fetch(`https://api.darksky.net/forecast/a3197f4a0625d96ff09f106347e2f151/${lat},${long}`);
        // const weatherJson = await weatherData.json();
        // res.json(weatherJson)

        res.render('weather', {
            api: 'Dark Sky',
            apiUrl: 'https://darksky.net/poweredby/',
        })
    } catch (error) {

    }
});

app.listen(2002);