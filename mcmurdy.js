var express = require('express');
var app = express();
var fetch = require('node-fetch');
// built in node module
var path = require('path');
​
​
/**
 * Documentation:
 * https://expressjs.com/en/api.html#app.param
 */
app.use('/:id', async (_req, _response) => {
    // :pokemonName ref to ${request.params.pokemonName}
    try {
        _response = await fetch(`https://api.coinranking.com/v1/public/coins/${_req.params.id}`);
        const _json = await _response.json();
        console.log(_json.forms);
​
        
    } catch (error) {
        console.log(error);
    }
});