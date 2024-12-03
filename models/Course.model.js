import mongoose, { Schema, model, models } from "mongoose";

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    code: {
      type: String,
      required: [true, "this field must not be empty"],
    },
    level: {
        type: String,
        required: [true, "this field must not be empty"]
    },
    surveyScores: [{
        totalScore: {
            type: Number
        },
        feedback: {
            type: String
        }
    }]
  },
  {
    timestamps: true,
  }
);

CourseSchema.pre("save", async function (next) {
  console.log("testing save");

  next();
});

const Course =
  models?.Course || model("Course", CourseSchema);

export default Course;
