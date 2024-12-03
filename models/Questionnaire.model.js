import mongoose, { Schema, model, models } from "mongoose";

const QuestionnaireSchema = new Schema(
    {
      totalScore:{
        type: Number
      },
      feedback:{
        type: String
      },
      course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      }
    },
    {
      timestamps: true,
    }
  );
  
  QuestionnaireSchema.pre("save", async function (next) {
    console.log("testing save");
  
    next();
  });
  
  const Questionnaire =
    models?.Questionnaire || model("Questionnaire", QuestionnaireSchema);
  
export default Questionnaire;
  