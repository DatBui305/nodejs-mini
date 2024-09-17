const router = require('express').Router()
const controller = require('../controllers/blog')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

router.put('/like/:bid', verifyAccessToken, controller.likeBlog)
router.put('/dislike/:bid', verifyAccessToken, controller.dislikeBlog)
router.get('/',controller.getBlogs)
router.get('/one/:bid',controller.getBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin],controller.deleteBlog)
router.put('/uploadimage/:bid',[verifyAccessToken, isAdmin], uploader.single('image') ,controller.uploadImageBlog)

router.post('/', [verifyAccessToken, isAdmin],controller.createBlog)
router.put('/:bid', [verifyAccessToken, isAdmin],controller.updateBlog)


module.exports = router

//CRUD | Create - Read - Update - Delete | Post - Get - Put - Delete


// create (post) + put - body // bao mat
// get + delete - query // ? & de bi lo 