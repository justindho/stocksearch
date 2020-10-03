const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})