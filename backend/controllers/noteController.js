const expressAsyncHandler = require('express-async-handler')
const Note = require('../Models/notesModel')

const getNotes = expressAsyncHandler( async (req ,res)=>{
    console.log(req.user._id)
    try {
        const note = await Note.find({user:req.user._id}) 
        res.status(200).json(note)
    } catch (error) {
        res.status(400)
        throw new Error('Error Occured!!')
    }
})

const createNote =  expressAsyncHandler( async (req ,res)=>{
    const { title, content, category } = req.body

    if (!title || !content || !category){
        res.status(401)
        throw new Error("Please fill out the required fill !!")
    } else {
        const notes = new Note({
            user: req.user._id,
            name:req.user.name,
            title,
            content,
            category
        })

        const newNote = await notes.save()
        res.status(201).json(newNote)
    }
})

const getNoteById =  expressAsyncHandler( async (req ,res)=>{
    const { id } = req.params
   try {
     const data = await Note.findById(id)
     console.log(data)
     res.status(201).json(data)
   } catch (error) {
    console.log(error)
    res.status(401)
    throw new Error("Note Not found")
   }
})

const UpdateNote = expressAsyncHandler( async (req ,res)=>{
    const { id } = req.params
    const { title, content, category } = req.body
   try {
     const note = await Note.findById(id)
     
     if (note.user.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error("You Can't prefrom this opertion")
     }

     note.title = title
     note.content = content
     note.category = category
     console.log("updated Notes",note)
     const updatedNote = await note.save()
     res.status(201).json(updatedNote)

   } catch (error) {
    console.log(error)
    res.status(401)
    throw new Error("Note Not found")
   }
})

const DeleteNote = expressAsyncHandler(async (req ,res)=>{
    try {
        const { id } = req.params
        const note = await Note.findById(id)
       
        if (note.user.toString() !== req.user._id.toString()){
            res.status(401)
            throw new Error("You Can't prefrom this opertion")
         }

        const deletedNote = note.deleteOne()
        res.status(201).json(deletedNote)
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error("Note Able to delete")
    }
})

const StarredNote = expressAsyncHandler(async (req, res)=>{
    try {
        const { id } = req.params
        const { star } = req.body
        console.log('inside',star)
        const note = await Note.findById(id)
     
     if (note.user.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error("You Can't prefrom this opertion")
     }

     note.star = star
     console.log("updated Notes",note)
     const updatedNote = await note.save()
     res.status(201).json(updatedNote)
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error("Note Not found")
    }  
})

module.exports = { getNotes, createNote, getNoteById, UpdateNote, DeleteNote, StarredNote }