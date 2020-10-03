require('dotenv').config();

const express = require('express');
const path = require('path');
const request = require('request');

const TIINGO_API_KEY = process.env.TIINGO_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})


app.get('/watchlist', (req, res) => {
  res.send('Hello from watchlist');
})


app.get('/portfolio', (req, res) => {
  res.send('Hello from portfolio');
})


app.get('/details/<ticker>', (req, res) => {
  res.send('Hello from ticker details');
})


app.get('/api/companydescription/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  let requestOptions = {
    'url': `https://api.tiingo.com/tiingo/daily/${ticker}?token=${TIINGO_API_KEY}`,
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json',
    }
  };

  request(requestOptions, (error, response, body) => {
    let json = JSON.parse(body);
    if (response.statusCode === 200) {
      res.json(json);
    } else {
      res.json({'error': true});
    }
  });
})


app.get('/api/latestprice/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  let requestOptions = {
    'url': `https://api.tiingo.com/iex/?tickers=${ticker}&token=${TIINGO_API_KEY}`,
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json',
    }
  }

  request(requestOptions, (error, response, body) => {
    let json = JSON.parse(body);
    if (response.statusCode === 200) {
      res.json(json);
    } else {
      res.json({'error': true});
    }
  });
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})