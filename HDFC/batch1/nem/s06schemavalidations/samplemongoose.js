/// Connecting DB with Nodejs
import mongoose from "mongoose";
/// step 1 is connecting to DB
mongoose.connect('mongodb://127.0.0.1:27017/hdfctest').then(()=>{
    console.log("Connected To DB")
}).catch((err)=>{ console.log("Failed To Connect DB")})

/// step 2 creating schema 
const catSchema = new mongoose.Schema({
    name:String,
    age:Number,
    gender:String,
    species:String
})
/// Step 3 creating model that connects Colection and Schema 
const CatModel = mongoose.model("Cat", catSchema)
/// create a funtion that inserts data into the DB
async function addCat(){
    let data = await CatModel.create({name:"Tom&Jerry", age:2,gender:"male", species:"Indian"})
    console.log("Cat Added")
    console.log(data)
}
addCat()

