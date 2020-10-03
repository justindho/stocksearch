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


let requestOptions = {
  'method': 'GET',
  'headers': {
    'Content-Type': 'application/json',
  }
}


let returnResponse = (res, requestOptions) => {
  request(requestOptions, (error, response, body) => {
    let json = JSON.parse(body);
    if (response.statusCode === 200) {
      res.json(json);
    } else {
      res.json({'error': true, 'errormsg': error, 'statusCode': response.statusCode});
    }
  });
}


app.get('/api/companydescription/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  requestOptions['url'] = `https://api.tiingo.com/tiingo/daily/${ticker}?token=${TIINGO_API_KEY}`;
  returnResponse(res, requestOptions);
})


app.get('/api/latestprice/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  requestOptions['url'] = `https://api.tiingo.com/iex/?tickers=${ticker}&token=${TIINGO_API_KEY}`;
  returnResponse(res, requestOptions);
})


app.get('/api/historicaldata/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const resampleFreq = 'daily';
  let date = new Date();
  const startTime = new Date(date.setFullYear(date.getFullYear() - 2)); // go 2 years back
  const startDate = `${startTime.getFullYear()}-${startTime.getMonth() + 1}-${startTime.getDate()}`;

  requestOptions['url'] = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${startDate}&resampleFreq=${resampleFreq}&token=${TIINGO_API_KEY}`;
  returnResponse(res, requestOptions);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})