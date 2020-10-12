require('dotenv').config();

const express = require('express');
const path = require('path');
const request = require('request');

const TIINGO_API_KEY = process.env.TIINGO_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

// Angular dist folder
// app.use('/samples', express.static(path.join(__dirname, 'dist')));
// app.use('/sample', sample);


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


app.get('/api/dailychartdata/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const resampleFreq = '1min';
  let day = new Date();

  // Get last day with trading data
  let getLastTradingDayOptions = {
    'url': `https://api.tiingo.com/iex/?tickers=${ticker}&token=${TIINGO_API_KEY}`,
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json',
    }
  }
  request(getLastTradingDayOptions, (error, response, body) => {
    if (response.statusCode == 200) {
      let json = JSON.parse(body);
      let startDate = json[0]['timestamp'];
      requestOptions['url'] = `https://api.tiingo.com/iex/${ticker}/prices?startDate=${startDate}&forceFill=true&resampleFreq=${resampleFreq}&token=${TIINGO_API_KEY}`;
      returnResponse(res, requestOptions);
    } else {
      res.json({'error': true, 'errormsg': error, 'statusCode': response.statusCode});
    }
  })
})


app.get('/api/autocomplete/:query', (req, res) => {
  const query = req.params.query.toUpperCase();
  requestOptions['url'] = `https://api.tiingo.com/tiingo/utilities/search?query=${query}&limit=100&columns=ticker,name&token=${TIINGO_API_KEY}`;
  request(requestOptions, (error, response, body) => {
    let json = JSON.parse(body);
    let data = json.filter(x => x.name !== null);
    if (data.length > 10) data = data.slice(0, 10);
    res.json(data);
  })
})


app.get('/api/news/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  requestOptions['url'] = `https://newsapi.org/v2/everything?q=${ticker}&apiKey=${NEWS_API_KEY}`;
  request(requestOptions, (error, response, body) => {
    if (response.statusCode === 200) {
      let json = JSON.parse(body);
      let data = json['articles'].map(x => {
        return {
          'url': x['url'],
          'title': x['title'],
          'description': x['description'],
          'source': x['source'],
          'urlToImage': x['urlToImage'],
          'publishedAt': x['publishedAt'],
        }
      });
      res.json(data);
    } else {
      res.json({'error': true, 'errormsg': error, 'statusCode': response.statusCode});
    }
  });
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})