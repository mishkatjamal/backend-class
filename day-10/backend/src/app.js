const express = require("express")
const app = express()
const noteModel = require("./model/note.model")
const cors = require("cors")
const path = require("path")
// most imp for readong data from req.body
app.use(express.json())
app.use(cors())
app.use(express.static("./public/dist"))

// POST /api/notes
// to create note in DB
app.post("/api/notes",async (req,res)=>{
    const {title,description,image} = req.body

    const note =await noteModel.create({
        title,description,image
    })
    res.status(201).json({
        message:"note created successfully"
    })
})


// GET /api/notes
// to get all the notes
app.get("/api/notes",async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})


// DELETE /api/notes/:id
// to delete note
app.delete("/api/notes/:id",async (req,res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"note deleted successfully"
    })
})


// PATCH /api/notes/:id
// to update notes 
app.patch("/api/notes/:id",async (req,res)=>{
    const id = req.params.id
    const {description}= req.body
    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:"note update successfully"
    })
})

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/dist/index.html"))
})
module.exports = app
