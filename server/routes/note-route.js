import express from 'express'
const router = express.Router()
import { createNote } from '../controllers/note-controller.js'  
import { getNotes } from '../controllers/note-controller.js'
import { updateNote } from '../controllers/note-controller.js'
import { deleteNote } from '../controllers/note-controller.js'

router.post('/create-note', createNote)
router.get('/get-notes', getNotes)
router.put('/update-note/:id', updateNote)
router.delete('/delete-note/:id', deleteNote)
export default router