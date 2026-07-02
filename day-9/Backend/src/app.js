/*
- server create karna 
-server ko config karna
 */

const express = require("express")

const app = express()

const noteModel = require("./models/note.model")
const cors = require("cors")
const path = require("path")
// isse req.body data read kar sakti hai 
app.use(express.json())
app.use(cors())
app.use(express.static("./public/dist"))

/*
POST  /api/notes
to cereate new note and save into DB
req.body = {title,description}
 */
app.post("/api/notes",async (req,res)=>{

    const  {title,description} = req.body

    const notes = await noteModel.create({
        title,description
    })

    res.status(200).json({
        message:"note created successfylly"
    })
})


/*
GET /api/notes
to fetch the data from mongoDB and send it to the response
 */

app.get("/api/notes",async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message:"notes fetched successgully",
        notes
    })
})


/*
DELETE  /api/notes/:id
to delete note in the DB
 */

app.delete("/api/notes/:id",async (req,res)=>{
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"note deleted"
    })
})


/*
PATCH /api/notes/:id
to update something in DB
{description} = req.body
 */

app.patch("/api/notes/:id",async (req,res)=>{

    const id = req.params.id
    const {description} = req.body
    await noteModel.findByIdAndUpdate(id,{description})

    res.status(200).json({
        message:"note modifeid successfully"
    })
})

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/dist/index.html"))
})
module.exports = app