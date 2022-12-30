const express = require('express')

const { getNotes, createNote, getNoteById ,UpdateNote, DeleteNote, StarredNote} = require('../controllers/noteController')
const protect  = require('../Middleware/authMiddleware')

const router = express.Router()

router.route('/').get(protect,getNotes)
router.route('/create').post(protect,createNote)
router.route('/:id').get(protect,getNoteById).put(protect,UpdateNote)
router.route('/:id').delete(protect,DeleteNote)
router.route('/starred/:id').put(protect,StarredNote)

module.exports = router