import mongoose from "mongoose";


async function connectToDB() {
    try{
       // console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to DB")
    }catch(err){
        console.log("Err in connecting in DB")
    }
}

export default connectToDB