const express = require('express')
const Note = require('../models/notes')
const router = express.Router()

// GET all notes
router.get('/', async (req, res) => {
   try {
    const notesAll = await Note.find({});
    res.status(200).json(notesAll)
   }
   catch{
    res.status(400).json({error : error.message})
   }
})

// POST a new note
router.post('/',async(req, res) => {
  const {title , content} = req.body
  try {
    const note = await Note.create({title, content})
    res.status(200).json(note)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// DELETE a note
router.delete('/:id', async(req, res) => {
  const {id} = req.params
  try {
    const note = await Note.findByIdAndDelete({_id : id})
    res.status(200).json(note)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// UPDATE a note
router.patch('/:id', async(req, res) => {
  const {id} = req.params
  const {title , content} = req.body
  try {
    const note = await Note.findByIdAndUpdate({_id : id},{title , content})
    res.status(200).json(note)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = router