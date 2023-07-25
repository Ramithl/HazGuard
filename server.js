const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, DocumentSnapshot } = require('firebase-admin/firestore');

const serviceAccount = require('./Firebase/hazguard-355-firebase-adminsdk-j0vly-ffc0d647dd.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const fields = ['temp', 'humd', 'co', 'flame']

const app = express();
const socket_server = http.createServer(app);
const io = socketIo(socket_server);

const server = new WebSocket.Server({ port: 8080 });

const wss = server;

//Web Sockets Server
server.on('connection', (ws) => {
  console.log('Client connected!');

  ws.on('message', (data) => {
    const jsonData = JSON.parse(data.toString());
    console.log(jsonData)
    const sensorDataRef = db.collection(jsonData.deviceID.toString()).doc('sensorData')

    sensorDataRef.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          let data = docSnapshot.data()
          fields.forEach((element) => {
            let dataArr = data[element]
            dataArr.shift()
            dataArr.push(jsonData[element])
            docSnapshot.ref.set({ [element]: dataArr }, {merge: true})
          })
        } else {
          fields.forEach((element) => {
            (initArr = []).length = 5;
            initArr.fill(0);
            docSnapshot.ref.set({ [element]: initArr }, {merge: true})
          })
        }
      })
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error: ${error}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected!');
  });
});

//root
app.get('/', (req, res) => {
  res.send('Hello This is Express Backend');
});

// Socket connection
io.on('connection', (socket) => {
  console.log('IO client connected');
  setInterval(() => {
    const tempRef = db.collection('112569').doc('sensorData')
    tempRef.get()
      .then((docSnapshot) => {
        let tempArr = docSnapshot.data()
        // console.log(tempArr)
        socket.emit('message', tempArr)
      })
    socket.emit
  }, 5000);

  socket.on('client', (data) => {
    console.log(`IO client recieved: `);
    let array = { alarm: 1 }
    wss.clients.forEach(function(client) {
      client.send(JSON.stringify(array));
    });
  });
});

// HTTP Server
socket_server.listen(3000, () => {
  console.log('HTTP server listening on port 3000');
});