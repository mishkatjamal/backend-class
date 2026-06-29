/*
- server ko start karna
- database se connect karna
*/

const app = require("./src/app")
const mongoose = require("mongoose")


// connect to db
function connectToDb(){
    mongoose.connect("mongodb+srv://mishkatjamal13_db_user:qE4TPEOqi9lPSIlk@cluster0.am40vte.mongodb.net/day-6")
    .then(()=>{
        console.log("db connected");
        
    })
}
connectToDb()


app.listen(3000,(req,res)=>{

    console.log("server is running on port 3000");
    
})