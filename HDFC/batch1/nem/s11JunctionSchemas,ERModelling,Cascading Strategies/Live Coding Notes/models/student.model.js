import mongoose from "mongoose";



const studentSchema = new mongoose.Schema({
    name:String,
    age:Number,
    gender:String,
})


// hooks pre and post should be wriiten here

studentSchema.pre("save", function (next) {
  console.log("This hook runs before DB operation")

  
  next(); // Continue to save the document
});

studentSchema.post("save", function (next) {
  console.log("This hook runs after DB operation")
 
  
});



// 🔹 Pre hook for findByIdAndDelete
studentSchema.pre("findOneAndDelete", async function (next) {
  const query = this.getQuery();
  // add logic that deletes all the enrollment of this student
  console.log("Pre Hook: Deleting student with query:", query);

  // Update related enrollments
    const enrollments = await Enrollment.find({
      course: this._id,
      isActive: true,
    });
    const studentIds = enrollments.map((enroll) => enroll.student);

    // Add studentIds to this course for post-hook to use
    this.enrolledStudentIds = studentIds;

    // Soft delete enrollments
    await Enrollment.updateMany(
      { studentId: this._id },
      { $set: { isDeleted: false } }
    );
  next();
});

// 🔹 Post hook for findByIdAndDelete
studentSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    // add logic that deletes all the enrollment of this student
    console.log("Post Hook: Student deleted:", doc.name);
  } else {
    console.log("Post Hook: No student found to delete");
  }
  next();
});



export const StudentModel = mongoose.model("Student", studentSchema)