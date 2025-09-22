import mongoose from "mongoose";



const courseSchema = new mongoose.Schema({
    title:String,
    startDate:{type:Date, default:Date.now()},
    enddate:{type:Date, default:Date.now()},

})



export const CourseModel = mongoose.model("Course", courseSchema)