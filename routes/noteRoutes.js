const express = require("express")
const { NoteModel } = require("../model/notesmodle")
const { auth } = require("../middleware/authMiddleware")

const noteRouter = express.Router()
noteRouter.use(auth)
// creating a new note
noteRouter.post("/create",async(req,res)=>{
    try {
        const note = new NoteModel(req.body)
        await note.save()
        // await NoteModel.insertMany(req.body)
        res.status(200).send({"msg":"new Note has been added"})
    } catch (error) {
        res.send({"msg":error})
    }
})

// reading all notes
noteRouter.get("/",async(req,res)=>{
    try {
        const q = req.query
        const notes = await NoteModel.find({userId:req.body.userId})
        res.send(notes)
    } catch (error) {
        res.send(error)
    }
})

// reading only one note by Id
noteRouter.get("/:id",async(req,res)=>{
    const {id} = req.params

    try {
        const q = req.query
        const notes = await NoteModel.findOne({_id:id})
        res.send(notes)
    } catch (error) {
        res.send(error)
    }
})


// updating notes
noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID} = req.params
    const note = await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.userId!==note.userId){
            res.send({"msg":"you are not authorize"})
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.send({"msg":"your note has been updates"})
        }
    } catch (error) {
        res.send(error)
    }
})


//deleting note
noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID} = req.params
    const note = await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.userId!==note.userId){
            res.send({"msg":"you are not authorize"})
        }else{
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.send({"msg":"your note has been deleted"})
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = {noteRouter}