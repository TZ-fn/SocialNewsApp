const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();
const jsonParser = bodyParser.json();
let posts = [{
    id: uuid.v4(),
    author: 'Tomasz',
    name: 'Google',
    address: 'https://www.google.com'
  },
  {
    id: uuid.v4(),
    author: 'Tomasz',
    name: 'GitHub',
    address: 'https://github.com/'
  },
  {
    id: uuid.v4(),
    author: 'Tomasz',
    name: 'MDN Web Docs',
    address: 'https://developer.mozilla.org/'
  },
  {
    id: uuid.v4(),
    author: 'Tomasz',
    name: 'DuckDuckGo',
    address: 'https://duckduckgo.com/'
  }
];

app.listen(process.env.PORT || 3000, () => console.log('App running!'));

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
  const author = request.body.author;
  const name = request.body.name;
  const address = request.body.address;
  posts.push({
    id: uuid.v4(),
    author: author,
    name: name,
    address: address
  });
  response.send([posts]);
});

app.delete('/deletePost', jsonParser, (request, response) => {
  const deletePostID = request.body[0];
  posts = posts.filter(post => post.id !== deletePostID);
  response.send('');
});