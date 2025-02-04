const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    complete: { type: Boolean, default: false }
  },
  { timestamps: true } 
  // MongoDB will automatically create createdAt and updatedAt fields!
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
