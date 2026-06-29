/*
server ko create karna 
serve ko config karna
*/
const express = require("express")

const app = express()
app.use(express.json())

const notes = []

//* post / notes

app.post("/notes",(req,res)=>{
    notes.push(req.body)

    res.status(201).json({
        message:"note created"
    })
})

// * get /notes
app.get("/notes",(req,res)=>{

    res.status(200).json({
        notes:notes,
        message:"notes fetch"
    })
})


// * delete /notes/:index

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]

    res.status(200).json({

        message:"note deleted"
    })
})

// * patch /notes/:index

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].des = req.body.des
    
    res.status(200).json({
        message:"note modified done"
    })
})

module.exports =app