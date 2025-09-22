### **Cascading Strategies for Data Integrity & Preservation: Ensuring Unbroken Relationships**

#### **3.1 What is a Cascading Effect?**

A **cascading effect** in database management refers to a **change in one document (or record)** that automatically triggers **related changes** in other documents. This ensures that dependent data remains consistent and prevents the existence of **orphaned or inconsistent records**.

#### **3.2 Cascading Strategies**

**Goal:** To ensure **data integrity**, **relationship consistency**, and **preservation of critical associations** between related documents in a database.

In applications with **related data models**, any action on one entity (delete, update, insert) may require corresponding actions on other entities. This is known as **cascading**.

---
The following are Verbal Explaination Only 
##### **3.2.1 Soft Delete**

- What is it?

Instead of deleting a document permanently, we **mark it as deleted** using a flag like `isDeleted: true`.

- Why is it useful?

- Allows recovery or "undo"
- Avoids accidental data loss
- Useful for audit logs or temporary hiding

- Example:

```js
courseSchema.add({ isDeleted: { type: Boolean, default: false } });
```

Use `.find({ isDeleted: false })` in queries.

---

##### **3.2.2 Archiving**

- What is it?

Instead of marking, we **move the document** from the main collection to a separate archival collection (e.g., `ArchivedCourses`).

- Why is it useful?

- Keeps production data clean and fast
- Still allows historical access
- Helps in compliance or backup scenarios

- Example:

```js
const archivedCourse = new ArchivedCourse(course.toObject());
await archivedCourse.save();
await course.deleteOne();
```

---

##### **3.2.3 Integrated Delete, Update, Restore from Archive**

- What is it?

A **workflow** that performs coordinated actions across related models:

- When a `Course` is archived → move related `Enrollments`
- On restore → bring back both course and enrollments

- Why is it useful?

- Maintains referential consistency
- Avoids orphan records
- Automates data transitions

- Example Workflow:

- Archive a course → also archive or soft-delete its enrollments
- Restore the course → restore its enrollments too

---

##### **3.2.4 Prevention of Duplicate Entries**

- What is it?

Prevent the creation of **redundant records** in many-to-many junction schemas (e.g., same student enrolling in the same course multiple times).

- Why is it useful?

- Maintains data accuracy
- Avoids bloated data and duplicate efforts
- Enforces true uniqueness in relationships

- Approaches:

**A. Programmatic Check**

```js
const existing = await Enrollment.findOne({ student, course });
if (existing) return res.status(400).json({ message: "Already enrolled" });
```

**B. Compound Unique Index**

```js
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
```

Then handle `duplicate key` errors (error code `11000`).

**C. Preventing Accidental Inserts with (upsert: false)**

- When using updateOne or findOneAndUpdate, setting upsert: false ensures that no new document is created if the match is not found.
- Use it when you only want to update existing records, not insert new ones.

Example:

```js
await Enrollment.updateOne(
  { student: studentId, course: courseId },
  { $set: { enrolledAt: new Date() } },
  { upsert: false }
);
```

If no matching enrollment exists, this will do nothing — preventing accidental insertions.

---

#### **3.3 Pre/Post hooks to execute Cascading Stratergies**

In Mongoose, **pre** and **post** hooks are functions that run **before** or **after** certain actions like saving or removing a document. They allow you to add extra behavior to your database operations.

### Pre Hooks

- **Run before** the action (e.g., save, update).
- Use it to modify or validate data **before** it's saved.

**Example:**

```javascript
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = hashPassword(this.password); // Hash password before saving
  }
  next(); // Continue to save the document
});
```

### Post Hooks

- **Run after** the action is completed (e.g., after saving, removing).
- Use it to perform tasks like logging or notifications **after** the action.

**Example:**

```javascript
userSchema.post("save", function (doc) {
  console.log("User saved:", doc); // Log after saving the user
});
```

### Summary

- **Pre:** Do something before saving, updating, or removing.
- **Post:** Do something after the action is done.

#### 3.1 Soft Deletion Of Course Using Pre/Post Hooks - Verbal Explaination Only 

- We can create cascading stratergies using these hooks, let us save, I want to delete a `course`,So the `course` will set `isDeleted` true, then all the enrollments of this course are no more a value, so I will be marking `isActive` as `false` for all enrollments, where this `course` was present, using `pre` hook
- Then `course` will be soft deleted
- Once `course` is deleted, then will add this course as `pastCourses` in the `student` schema for future ref, using `post` hook

##### Updated **Course Schema** (with pre and post hooks)

```js
const mongoose = require("mongoose");
const Enrollment = require("./Enrollment"); // Make sure path is correct
const Student = require("./Student"); // Make sure path is correct

const courseSchema = new mongoose.Schema({
  title: String,
  isActive: { type: Boolean, default: true },
});

// Pre Hook: Mark related enrollments as inactive when the course is soft-deleted
courseSchema.pre("save", async function (next) {
  if (!this.isModified("isActive")) return next(); // skip if isActive not changing

  if (this.isActive === false) {
    console.log(
      `🧹 Pre Hook: Soft-deleting enrollments for course ${this._id}`
    );

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
      { course: this._id },
      { $set: { isActive: false } }
    );
  }
  next();
});

// Post Hook: After course is saved (soft-deleted), push the courseId to each student's course list
courseSchema.post("save", async function () {
  if (this.isActive === false && this.enrolledStudentIds?.length) {
    console.log(
      `📬 Post Hook: Adding soft-deleted course ${this._id} to students' courses`
    );

    // Find students and add this courseId to their courses array
    await Student.updateMany(
      { _id: { $in: this.enrolledStudentIds } },
      { $addToSet: { pastCourses: this._id } } // Add to set ensures no duplicates
    );
  }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
```

---

##### **Student Schema** (No changes needed here)

```js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  pastCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
```

---

##### **Enrollment Schema** (No changes needed)

```js
const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  enrolledAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;
```

---

##### **Soft Delete Route**

```js
// Soft delete a course and deactivate its enrollments
app.delete("/courses/:id/", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).send("Course not found");

  course.isActive = false;
  await course.save(); // triggers pre and post hooks

  res.send(
    "✅ Course soft-deleted, enrollments deactivated, students notified"
  );
});
```

---

##### Explanation:

- **Pre Hook:** The course’s related enrollments are marked as inactive before the course itself is saved.
- **Post Hook:** After the course is saved, the post hook pushes the course ID to the `courses` array in all students who were enrolled in that course.

- The pre hook is executed **before** saving the course, while the post hook is executed **after** the save operation is complete.

- With this setup, when a course is soft-deleted, all the related enrollments are deactivated, and the course ID is tracked in each student’s `courses` array, demonstrating how cascading logic can be implemented with Mongoose hooks.
