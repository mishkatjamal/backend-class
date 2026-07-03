const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title:String,  //yaha pe title and uska type btana hota hai 
    description:String,
    image:String
})

const noteModel = mongoose.model("day-10",noteSchema)

module.exports = noteModel