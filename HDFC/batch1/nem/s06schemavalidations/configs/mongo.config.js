import mongoose from "mongoose"

async function connectToDB (){
   try{
     await mongoose.connect(process.env.MONGO_URL)
    console.log("connected To DB")
   }catch(err){
    console.log("Error in Connecting DB")
   }
}

export default connectToDB