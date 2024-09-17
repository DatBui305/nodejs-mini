const router = require('express').Router()
const controller = require('../controllers/coupon')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.get('/', controller.getCoupons)
router.post('/', [verifyAccessToken, isAdmin],controller.createCoupon)
router.put('/:cid', [verifyAccessToken, isAdmin],controller.updateCoupon)
router.delete('/:cid', [verifyAccessToken, isAdmin],controller.deleteCoupon)


module.exports = router

//CRUD | Create - Read - Update - Delete | Post - Get - Put - Delete


// create (post) + put - body // bao mat
// get + delete - query // ? & de bi lo 