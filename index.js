const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = 8001
// websocket stuff
const { Server } = require('socket.io')
const io = new Server(server) 
// mqtt stuff
const broker_url = 'mqtt://tofu:1883';
const my_topic = 'challenge/alarm';
const client_id = 'challenger';
const mqtt = require('mqtt');
const broker = mqtt.connect(broker_url, { clientId: client_id });

// mqtt broker async voodoo ---------------------------------------------------
broker.on('connect', onConnected);
broker.on('message', onMessageReceived);

// subscribe to topic
function onConnected() {
    broker.subscribe(my_topic);
}

// handle events recived in topic
function onMessageReceived(topic, message) {
    const payload = JSON.parse(message);
}

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/challange.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

server.listen(port, () => {
    console.log(`listening on http://tofu:${port}`)
})
