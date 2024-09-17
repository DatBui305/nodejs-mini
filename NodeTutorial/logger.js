const EventEmitter = require('events');
const emitter = new EventEmitter();
var url = "http://mylogger.io/log";

function log(message) {
    // Send an HTTP request
    console.log(message);
    //raise an event
    emitter.emit('messageLogged', { id: 1, url: 'http://' }); // Raise an event

}

module.exports = log;
