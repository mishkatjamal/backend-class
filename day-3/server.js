const express = require("express")

const app = express()
app.use(express.json())

const notes = []
// ^ post use for send data to server
app.post("/notes",(req,res)=>{
    console.log(req.body);

    notes.push(req.body)
    
    res.send("note created")
})

//^ get use to recieved data from the server
app.get("/notes",(req,res)=>{

    res.send(notes)
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})