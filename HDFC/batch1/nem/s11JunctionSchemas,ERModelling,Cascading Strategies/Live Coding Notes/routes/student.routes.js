import express from "express";
import { StudentModel } from "../models/student.model.js";
import { EnrollmentModel } from "../models/enrollment.model.js";

export const StudentRouter = express.Router();

StudentRouter.post("/add-student", async (req, res) => {
  try {
    let user = await StudentModel.create(req.body);
    res.status(201).json({ message: "Student Created", user });
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
});


/// enrollment 


StudentRouter.post("/enroll/:courseId/student/:studentId", async(req,res)=>{
  // form params we get course and studentId
  const {courseId, studentId} = req.params;
  console.log(studentId)
  let enrollement = await EnrollmentModel.create({courseId,studentId})
  res.status(201).json({ message: "Enrolled In The Course", enrollement });
})

/// get my courses
StudentRouter.get("/mycourses/:studentId",async(req,res)=>{
  // form params we get course and studentId
  const {studentId} = req.params;
  let enrollement = await EnrollmentModel.find({studentId}).populate("studentId").populate("courseId")
  res.status(201).json({ message: "Course List", enrollement });
} )

/// pre hook fn


StudentRouter.patch("/update-name/:studentId", async(req,res)=>{
  // form params we get course and studentId
  const {studentId} = req.params;
  let student = await StudentModel.findById(studentId).lean();
  student.name = req.body.name;
  await student.save() /// This will not work as student is not document no more, it is object because of lean
  console.log("This console is after saving the document")
  res.status(201).json({ message: "Student Data saved", student });
} )



StudentRouter.delete("/update-name/:studentId", async(req,res)=>{
  // form params we get course and studentId
  const {studentId} = req.params;

    // 👇 Deletion logic: remove the `name` field
///Method 1: Maintaing Cascading Effect in the Logic, 
            // that is  find all the enrollments and delete them and finally delete the student
                 //or 
// Method 2: Maitain cascading effect through pre or post hook
const student = await StudentModel.findByIdAndDelete(studentId);
  console.log("This console is after saving the document")
  res.status(201).json({ message: "Student Data saved", student });
} )