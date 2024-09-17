require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const {default: helmet} = require('helmet')
const compression = require('compression')
const app = express()


// console.log('Process:: ', process.env)
//init middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())


//init databasse
require('./dbs/init.mongodb')
// const {checkOverLoad} = require('./helpers/check.connect')
// checkOverLoad()

//init router
app.use('', require('./routers'))

//handling error

module.exports = app