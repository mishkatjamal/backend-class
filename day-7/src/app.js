/*
-server create karna 
-server ko config karna
 */

const express = require("express")
const app = express()

app.use(express.json())
const noteModel = require("./models/note.model")



// post /notes
// req.body => {tittle,description}

app.post("/notes",async (req,res)=>{

    const{title,des} = req.body

    const note = await noteModel.create({
        title,des
    })

    res.status(201).json({
        message:"note created successfully",
        note
    })
})

module.exports = app