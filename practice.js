var express = require('express');
var app = express();
var fetch = require('node-fetch');
var path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get('/:pokemonName', async(req, res) => {

    try {
        pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.pokemonName}`);

        const json = await pokemonData.json();
        console.log(json.sprites.back_default);

        const {...sprites} = json.sprites;
        console.log("sprites", sprites);
        res.render('index', {
            data: {
                name: json.name

            }
        })
    } catch (error) {
        console.log(error)
    }
})

app.listen(3001);