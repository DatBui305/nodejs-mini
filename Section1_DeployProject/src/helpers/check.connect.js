'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000
//count connect
const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log('Number of connection::'+numConnection)
}
//check over load
const checkOverLoad = () => {
    setInterval( () => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // example maximun number of connections based on number of cores
        const maxConnections = numCores * 5;

        console.log('Active connections:'+numConnection)
        console.log('Max connections:'+maxConnections)
        console.log('Memory usage:: '+memoryUsage/1024/1024+' MB')

        if(numConnection > maxConnections) {
            console.log('Connection overload detected!')
            //notify.send(....)
        }
    },_SECONDS)
}


module.exports = {
    countConnect,
    checkOverLoad
}