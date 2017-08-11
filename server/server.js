const path     = require('path'),
      express  = require('express'),
      socketIO = require('socket.io'),
      http     = require('http');

const staticPath = path.join(__dirname, '../static');
const port       = 8000;

const app    = express();
const server = http.createServer(app);
const io     = socketIO(server);

app.use('/static', express.static(staticPath));

app.get('/*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

let clients = [];
io.on('connection', socket => {

  //join users online
  socket.on('join', ({ username }, done) => {
    socket.username = username;
    clients.push(socket);

    io.emit('users online', {
      users: clients.map(client => client.username)
    });
    done();
  });

  //disconnect
  socket.on('disconnect', () => {
    let i = clients.indexOf(socket);
    clients.splice(i, 1);

    io.emit('users online', {
      users: clients.map(client => client.username)
    });
  });

});

server.listen(port, err => {
  if (! err) {
    console.log(`Server running on port ${port}`);
  }
});
