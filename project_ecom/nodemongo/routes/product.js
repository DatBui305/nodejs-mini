const router = require('express').Router()
const controller = require('../controllers/product')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.post('/', [verifyAccessToken, isAdmin],controller.createProduct)
router.put('/ratings',verifyAccessToken,controller.ratings)
router.put('/:pid',[verifyAccessToken, isAdmin], controller.updateProduct)
router.put('/uploadimage/:pid',[verifyAccessToken, isAdmin], uploader.array('images', 10) ,controller.uploadImagesProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin] ,controller.deleteProduct)
router.get('/',controller.getProducts)
router.get('/:pid',controller.getProduct)

module.exports = router

//CRUD | Create - Read - Update - Delete | Post - Get - Put - Delete


// create (post) + put - body // bao mat
// get + delete - query // ? & de bi lo 