import mongoose, { Schema, model, models } from "mongoose";

const LevelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "this field must not be empty"],
    },
  },
  {
    timestamps: true,
  }
);

LevelSchema.pre("save", async function (next) {
  console.log("testing save");

  next();
});

const Level =
  models?.Level || model("Level", LevelSchema);

export default Level;
