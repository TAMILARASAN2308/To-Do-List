const Task = require("../models/taskModel"); 

exports.task = async (req, res) => {
  try {
    const { task, complete } = req.body;

    const taskDetails = new Task({
      task,
      complete,
    });

    await taskDetails.save();

    res.status(201).json({ msg: "Task stored successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred, please try again later" });
  }
};

exports.items = async (req, res) => {
    try {
      const items = await Task.find({});
      res.status(200).json(items); 
    } catch (error) {
      console.log('Error fetching todo items:', error);
      res.status(500).json({ msg: 'Internal server error' }); 
    }
  };

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Task.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json({ msg: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

exports.isComplete = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }

        task.complete = !task.complete;
        await task.save();

        res.status(200).json({ msg: "Updated successfully", task });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


exports.updateTask = async (req,res)=>{
  try {
      const { id } = req.params; 
      const { task } = req.body; 

      const updatedTask = await Task.findByIdAndUpdate(id, { task }, { new: true });

      if (!updatedTask) {
          return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: "Server error", error });
  }
}
