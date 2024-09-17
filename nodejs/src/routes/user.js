
import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middleware/verify_token'
import { isAdmin, isCreatorOrAdmin } from '../middleware/verify_roles'
const router = express.Router()


// Private routes
router.use(verifyToken)
router.use(isCreatorOrAdmin)

router.get("/", controllers.getCurrent)

module.exports = router;