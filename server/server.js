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

io.on('connection', socket => {
  console.log('new connection');
});

server.listen(port, err => {
  if (! err) {
    console.log(`Server running on port ${port}`);
  }
});
