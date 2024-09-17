import express from 'express'
import * as controllers from '../controllers'
const router = express.Router()


// Private routes
router.get("/", controllers.insertData)

export default router