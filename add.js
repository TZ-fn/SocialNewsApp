const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App running!');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.static(`${__dirname}`));

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

app.post('/', jsonParser, (request, response) => {

  response.send();
});