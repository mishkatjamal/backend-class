const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect("mongodb+srv://mishkatjamal13_db_user:qE4TPEOqi9lPSIlk@cluster0.am40vte.mongodb.net/day-7")
    .then(()=>{
        console.log("connect to DB");
        
    })
}

module.exports = connectToDB