const app = require('./src/app');
// const {app: {PORT}} = require('../Section1_DeployProject/src/configs/config.mongodb')
const PORT = process.env.PORT || 3005

const server = app.listen(PORT, () => {
    console.log('WSV eCommerce start with '+ PORT)
})


process.on('SIGINT', ()=> {
    server.close(()=> console.log('Exit Server Express'))
    // notify.send(ping...)
})