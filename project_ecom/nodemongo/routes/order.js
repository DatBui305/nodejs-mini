const router = require('express').Router()
const controller = require('../controllers/order')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')


router.post('/', [verifyAccessToken], controller.createOrder)
router.put('/status/:oid', [verifyAccessToken, isAdmin], controller.updateStatus)
router.get('/', [verifyAccessToken], controller.getUserOrder)
router.get('/admin', [verifyAccessToken, isAdmin], controller.getOrders)


module.exports = router

//CRUD | Create - Read - Update - Delete | Post - Get - Put - Delete


// create (post) + put - body // bao mat
// get + delete - query // ? & de bi lo 