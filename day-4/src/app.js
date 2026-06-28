/* 

- server create krna
- server ko config krna

*/
const express = require("express")

const app = express()/* server create ho jata hai. */
app.use(express.json())
const notes = []

// post /notes
// data send karne ke liye
app.post("/notes",(req,res)=>{
    console.log(req.body);

    notes.push(req.body)
    console.log(notes);
    
    res.send("notes created")
})

// get /notes
// to fetch data
app.get("/notes", (req, res) => {
    res.send(notes)
})

// delete /:index
// note ko delete karne ke liye
// params milta hai 
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.send("notes delete successfully")
})

// patch /:index
// notes me se kuch part update krne ke liye

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].des =req.body.des

    res.send("note modified successfully")
})


module.exports = app