const WebSocket = require('ws');

// Create a new WebSocket server
const server = new WebSocket.Server({ port: 8080 });

// Define a callback function to handle incoming WebSocket connections
server.on('connection', (ws) => {
  console.log('Client connected!');

  // Send a message to the client when the connection is established
  ws.send('Hello, client!');

  // Define a callback function to handle incoming WebSocket messages
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Send a response back to the client
    ws.send(`You said: ${message}`);
  });

  // Define a callback function to handle WebSocket errors
  ws.on('error', (error) => {
    console.error(`WebSocket error: ${error}`);
  });

  // Define a callback function to handle WebSocket disconnections
  ws.on('close', () => {
    console.log('Client disconnected!');
  });
});