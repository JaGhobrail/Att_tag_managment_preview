const express = require('express')
const next = require('next')
const myserver = require('http').createServer()
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        const io = require('socket.io')(myserver,{
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
        myserver.listen(3001, () => {
            console.log('listening on *:3001');
          });
          
        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })