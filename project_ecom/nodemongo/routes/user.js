const router = require('express').Router()
const controller = require('../controllers/user')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')



router.put('/cart', [verifyAccessToken], controller.updateCart)
router.put('/address/', [verifyAccessToken],controller.updateUserAddress)
router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/current', verifyAccessToken, controller.getCurrent)
router.post('/refreshtoken', controller.refreshAccessToken)
router.get('/logout', controller.logout)
router.get('/forgotpassword', controller.forgotPassword)
router.put('/resetpassword', controller.resetPassword)
router.get('/', [verifyAccessToken, isAdmin], controller.getUsers)
router.delete('/', [verifyAccessToken, isAdmin], controller.deleteUser)
router.put('/current', verifyAccessToken,controller.updateUser)
router.put('/:uid', [verifyAccessToken, isAdmin], controller.updateUserByAdmin)



module.exports = router

//CRUD | Create - Read - Update - Delete | Post - Get - Put - Delete


// create (post) + put - body // bao mat
// get + delete - query // ? & de bi lo 