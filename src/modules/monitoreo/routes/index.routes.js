import Router from 'express'
import { getAllStatus } from '../controllers/index.controller.js'

const router = Router()

router.route('/all-status').get(getAllStatus)

module.exports = router
