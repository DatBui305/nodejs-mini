const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
}); // Listener

const log = require('./logger');
log('message'); // Raise an event