import mongoose from "mongoose";



const enrollmentSchema = new mongoose.Schema({
    title:String,
    studentId:{type:mongoose.Schema.Types.ObjectId, ref:"Student"},
    courseId:{type:mongoose.Schema.Types.ObjectId, ref:"Course"}
})



export const EnrollmentModel = mongoose.model("Enrollment", enrollmentSchema)

/// enrollement is Junction Schema which maintains many to many relationship
/// 1 student can have many courses --many enrollments
/// 1 course can have many students -- many enrollments