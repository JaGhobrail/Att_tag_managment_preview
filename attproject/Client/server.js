const server = require('http').createServer();
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:3000"
      }
});



io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (data) => {
    console.log('message received:', data);
    io.emit('message', data);
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
