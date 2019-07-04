const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();
const posts = [{
    id: 'TomGoow.g',
    author: 'Tomasz',
    name: 'Google',
    address: 'https://www.google.com'
  },
  {
    id: 'TomGitthu',
    author: 'Tomasz',
    name: 'GitHub',
    address: 'https://github.com/'
  },
  {
    id: 'TomMDNvel',
    author: 'Tomasz',
    name: 'MDN Web Docs',
    address: 'https://developer.mozilla.org/'
  }
];


app.listen(process.env.PORT || 3000, () => {
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

app.get('/links', (request, response) => {
  response.send([posts]);
});

app.post('/', jsonParser, (request, response) => {
  const id = request.body.id;
  const author = request.body.author;
  const name = request.body.name;
  const address = request.body.address;
  posts.push({
    id: id,
    author: author,
    name: name,
    address: address
  });
  response.send({
    id: id,
    author: author,
    name: name,
    address: address
  });
});