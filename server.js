const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, DocumentSnapshot } = require('firebase-admin/firestore');

const serviceAccount = '../Firebase/hazguard.json'

const accountSID = process.env.TWILIO_SID
const authToken = process.env.AUTH_TOKEN

const client = require('twilio')(accountSID, authToken)

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
let clientSocket;

let callPlaced = false;

//Web Sockets Server
server.on('connection', (ws) => {
  console.log('Client connected!');

  if (clientSocket){
    clientSocket.emit('hazdc', {connected: true})
  }

  ws.on('message', (data) => {
    const jsonData = JSON.parse(data.toString());

    // Call Function
    if (jsonData['co'] > 20 && callPlaced == false) {
      client.calls.create({
        to: '+94767802033',
        from: '+12294148275',
        url: 'https://handler.twilio.com/twiml/EH887f8352bcf78013f9534125e067bd43'
      })
        .then(call => console.log(call.sid));
      callPlaced == true;
    }


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
            docSnapshot.ref.set({ [element]: dataArr }, { merge: true })
          })
        } else {
          fields.forEach((element) => {
            (initArr = []).length = 5;
            initArr.fill(0);
            docSnapshot.ref.set({ [element]: initArr }, { merge: true })
          })
        }
      })
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error: ${error}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected!');
    if (clientSocket){
      clientSocket.emit('hazdc', {connected: false})
    }
  });
});

//root
app.get('/', (req, res) => {
  const tempRef = db.collection('112569').doc('sensorData')
  tempRef.get()
    .then((docSnapshot) => {
      let tempArr = docSnapshot.data()
      // console.log(tempArr)
      res.send(tempArr);
    })

});

// Socket connection
io.on('connection', (socket) => {

  clientSocket = socket;
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
    wss.clients.forEach(function (client) {
      client.send(JSON.stringify(array));
    });
  });
});

// HTTP Server
socket_server.listen(3000, () => {
  console.log('HTTP server listening on port 3000');
});