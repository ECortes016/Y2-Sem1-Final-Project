var express = require('express');
var app = express();
var fetch = require('node-fetch');
var path = require('path');
// npm install --save express-ejs-layouts
var expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/coins/:coin_id', async (req, res) => {
    try {
        coinData = await fetch(`https://api.coinranking.com/v1/public/coin/${req.params.coin_id}`);

        const json = await coinData.json();
        console.log(json);

        const { ...data } = json.data;
        // console.log("coin", data);
        res.render('coins', {
            name: json.data.coin.name,
            description: json.data.coin.description,
            image: json.data.coin.iconUrl,
            price: json.data.coin.price,
            rank: json.data.coin.rank,
            sign: json.data.base.sign,
            symbol: json.data.base.symbol,
            socials: json.data.coin.socials,
            api: "Coinranking"
        })
    } catch (error) {
        console.log(error)
    }
});

app.get('/', async (req, res) => {
    try {
        coinData = await fetch(`https://api.coinranking.com/v1/public/coin/${req.params.coin_id}`);

        const json = await coinData.json();
        console.log(json);

        const { ...data } = json.data;
        // console.log("coin", data);
        res.render('index', {
            name: json.data.coin.name
        })
    } catch (error) {
        console.log(error)
    }
});


app.listen(2002);