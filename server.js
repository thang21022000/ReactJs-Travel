<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 56cfeff74c5490b6987482fe4d7ebd54989b875a
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000;
<<<<<<< HEAD

server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running')
})
=======
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
>>>>>>> 60836d7835a3efdc029f2c8a28a90692fa57923d
=======

server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running')
})
>>>>>>> 56cfeff74c5490b6987482fe4d7ebd54989b875a
