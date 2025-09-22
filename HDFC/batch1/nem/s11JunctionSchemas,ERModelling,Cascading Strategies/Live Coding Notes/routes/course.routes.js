import express from "express";
import { CourseModel } from "../models/course.model.js";
import { EnrollmentModel } from "../models/enrollment.model.js";

export const CourseRouter = express.Router();

CourseRouter.post("/add-course", async (req, res) => {
  try {
    let course = await CourseModel.create(req.body);
    res.status(201).json({ message: "course Created", course });
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
});


CourseRouter.get("/students/:courseId",async (req, res) => {
  const {courseId} = req.params
  try {
    let data = await EnrollmentModel.find({courseId}, {studentId:1}).populate("studentId");
    res.status(201).json({ message: "course details", data });
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
} )
