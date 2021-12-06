const express = require('express')
const router = express.Router()

const listController = require('../controllers/list')
const authMiddleware = require('../middleware/auth')

// Mount middleware
router.use('/authenticated/', authMiddleware.verifyToken)

router.post('/authenticated/getLists', listController.getAuthenticatedUserLists)
router.post('/authenticated/create', listController.createList)
router.post('/authenticated/delete', listController.deleteList)

// Routes that do not need authentication
router.get('/public/:username/getLists', listController.getUserLists)
router.get('/public/:id', listController.getListById)



module.exports = router