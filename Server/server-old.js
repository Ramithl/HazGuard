const net = require('net');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./hazguard-355-firebase-adminsdk-j0vly-7650301fb8.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


//TCP server
const tcpServer = net.createServer(socket => {
    socket.on("data", data => {
        const jsonData = JSON.parse(data.toString())
        console.log(jsonData)
        db.collection(jsonData.deviceID).doc('fulldata').get().sensorValues // CHANGE
        sensorValues.shift()
        sensorValues.push(jsonData.ch4)
        db.collection(jsonData.deviceID).doc('fulldata').update({sensorValues: {sensorValues}})
    })
})

tcpServer.listen(3000, ()=>{
    console.log('TCP server has started and listening om port 3000')
})


//root
app.get('/', (req, res) => {
    res.send('Hello This is Express Backend');
});

// Socket connection
io.on('connection', (socket) => {
    console.log('Socket.IO connection established on HTTP');


    socket.emit('message', 'Hello from HTTP Socket.IO server!');


    socket.on('myEvent', (data) => {
        console.log(`Received message: ${data}`);
    });
});

// HTTP Server
server.listen(8080, () => {
    console.log('HTTP server listening on port 8080');
});