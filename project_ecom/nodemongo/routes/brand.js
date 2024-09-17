const router = require('express').Router()
const controller = require('../controllers/brand')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')


router.get('/', controller.getBrands)
router.post('/', [verifyAccessToken, isAdmin],controller.createBrand)
router.delete('/:bid', [verifyAccessToken, isAdmin],controller.deleteBrand)
router.put('/:bid', [verifyAccessToken, isAdmin],controller.updateBrand)


module.exports = router

//CRUD | Create - Read - Update - Delete | Post - Get - Put - Delete


// create (post) + put - body // bao mat
// get + delete - query // ? & de bi lo 