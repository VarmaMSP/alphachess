const path     = require('path'),
      express  = require('express'),
      socketIO = require('socket.io'),
      http     = require('http'),
      uuid     = require('uuid/v1');

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

    io.sockets.emit('users online', {
      users: clients.map(client => client.username)
    });
    done();
  });

  //disconnect
  socket.on('disconnect', () => {
    let i = clients.indexOf(socket);
    clients.splice(i, 1);

    io.sockets.emit('users online', {
      users: clients.map(client => client.username)
    });
  });

  socket.on('create game', ({ opponent }) => {
    let gameId = uuid();
    let opponentSocket = null;

    let x = clients.indexOf(socket);
    let y;
    for (let i = 0; i < clients.length; ++i) if (clients[i].username === opponent) {
        y = i;
        break;
    }

    clients[x].join(gameId);
    clients[y].join(gameId);

    clients[x].emit('start game', {color: 'w', opponent: clients[y].username, gameId}, () => {
      clients[y].emit('start game', {color: 'b', opponent: clients[x].username, gameId}, () => {
        clients.splice(x, 1);
        clients.splice(y, 1);
        io.sockets.emit('users online', {
          users: clients.map(client => client.username)
        });
      });
    });
  });

  socket.on('move', ({ gameId, selectedSquare, to, flag }) => {
    console.log(gameId);
    socket.broadcast.to(gameId).emit('make move', {selectedSquare, to, flag});
  });

});

server.listen(port, err => {
  if (! err) {
    console.log(`Server running on port ${port}`);
  }
});
