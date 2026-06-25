const express = require("express")

const app = express()  //initialize

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.get("/about",(req,res)=>{
    res.send("about page")
})

app.listen(3000)