require('dotenv').config();

const express = require('express');
const axios = require('axios');
const router = express.Router();
const path = require('path');

const TIINGO_API_KEY = process.env.TIINGO_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

// Angular dist folder
// app.use('/samples', express.static(path.join(__dirname, 'dist')));
// app.use('/sample', sample);


let requestOptions = {
  'method': 'GET',
  'headers': {
    'Content-Type': 'application/json',
  }
}


let returnResponse = (responseObj, url) => {
  axios({
    method: 'get',
    url: url,
    responseType: 'json',
  })
    .then(response => {
      if (response['status'] === 200 && response['data'].length !== 0) {
        responseObj.json(response['data']);
      } else if (response['status'] === 429) {
        responseObj.json({'error': true, 'statusCode': response['status'], 'errorMsg': `Reached API limit! Please wait until the top of the hour to try again.`});
      } else {
        responseObj.json({'error': true, 'statusCode': response['status'], 'errorMsg': `Ticker not found.`});
      }
    })
    .catch(error => {
      responseObj.json({'error': true, 'errorMsg': error, 'statusCode': error['response']['status']});
    });
}


router.get('/api/companydescription/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  returnResponse(res, `https://api.tiingo.com/tiingo/daily/${ticker}?token=${TIINGO_API_KEY}`);
})


router.get('/api/latestprice/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  returnResponse(res, `https://api.tiingo.com/iex/?tickers=${ticker}&token=${TIINGO_API_KEY}`);
})


router.get('/api/historicaldata/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const resampleFreq = 'daily';
  let date = new Date();
  const startTime = new Date(date.setFullYear(date.getFullYear() - 2)); // go 2 years back
  const startDate = `${startTime.getFullYear()}-${startTime.getMonth() + 1}-${startTime.getDate()}`;
  returnResponse(res, `https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${startDate}&resampleFreq=${resampleFreq}&token=${TIINGO_API_KEY}`);
})


router.get('/api/dailychartdata/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  const resampleFreq = '4min';

  // Get last day with trading data
  axios.get(`https://api.tiingo.com/iex/?tickers=${ticker}&token=${TIINGO_API_KEY}`)
    .then(responseLastTradingDay => {
      if (responseLastTradingDay['status'] == 200) {
        let json = responseLastTradingDay['data'];
        let startDate = json[0]['timestamp'].substring(0, 10);
        returnResponse(res, `https://api.tiingo.com/iex/${ticker}/prices?startDate=${startDate}&forceFill=true&resampleFreq=${resampleFreq}&token=${TIINGO_API_KEY}`);
      } else if (response['status'] === 429) {
        responseObj.json({'error': true, 'statusCode': response['status'], 'errorMsg': `Reached API limit! Please wait until the top of the hour to try again.`});
      } else {
        res.json({'error': true, 'statusCode': responseLastTradingDay['status']});
      }
    })
    .catch(error => {
      responseObj.json({'error': true, 'errorMsg': error, 'statusCode': error['response']['status']});
    });
})


router.get('/api/autocomplete/:query', (req, res) => {
  const query = req.params.query.toUpperCase();
  axios.get(`https://api.tiingo.com/tiingo/utilities/search?query=${query}&limit=100&columns=ticker,name&token=${TIINGO_API_KEY}`)
    .then(response => {
      if (response['status'] === 200) {
        let data = response['data'];
        data = data.filter(x => x.name !== null);
        if (data.length > 10) data = data.slice(0, 10);
        res.json(data);
      } else if (response['status'] === 429) {
        responseObj.json({'error': true, 'statusCode': response['status'], 'errorMsg': `Reached API limit! Please wait until the top of the hour to try again.`});
      } else {
        res.json({'error': true, 'statusCode': response['status']});
      }
    })
    .catch(error => {
      responseObj.json({'error': true, 'errorMsg': error, 'statusCode': error['response']['status']});
    });
})


router.get('/api/news/:ticker', (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  axios.get(`https://newsapi.org/v2/everything?q=${ticker}&apiKey=${NEWS_API_KEY}`)
    .then(response => {
      if (response['status'] === 200) {
        let data = response['data'];
        data = data['articles'].map(x => {
          return {
            'url': x['url'],
            'title': x['title'],
            'description': x['description'],
            'source': x['source'],
            'urlToImage': x['urlToImage'],
            'publishedAt': x['publishedAt'],
          }
        });
        data = data.filter(x => x['url'] !== null
                                && x['title'] !== null
                                && x['description'] !== null
                                && x['source'] !== null
                                && x['urlToImage'] !== null
                                && x['publishedAt'] !== null);
        res.json(data);
      } else if (response['status'] === 429) {
        responseObj.json({'error': true, 'statusCode': response['status'], 'errorMsg': `Reached API limit! Please wait until the top of the hour to try again.`});
      } else {
        res.json({'error': true, 'statusCode': response['status']});
      }
    })
    .catch(error => {
      responseObj.json({'error': true, 'errorMsg': error, 'statusCode': error['response']['status']});
    });
})


app.use(router);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})