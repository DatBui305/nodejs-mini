const router = require('express').Router()
const controller = require('../controllers/blogCategory')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')


router.get('/', controller.getCategories)
router.post('/', [verifyAccessToken, isAdmin],controller.createCategory)
router.delete('/:bcid', [verifyAccessToken, isAdmin],controller.deleteCategory)
router.put('/:bcid', [verifyAccessToken, isAdmin],controller.updateCategory)


module.exports = router

//CRUD | Create - Read - Update - Delete | Post - Get - Put - Delete


// create (post) + put - body // bao mat
// get + delete - query // ? & de bi lo 