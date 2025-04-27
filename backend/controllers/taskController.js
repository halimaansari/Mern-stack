import Task from '../models/task.js'; // Import Task model

// @desc Create a Task
// @route POST /api/tasks
// @access Private
export const createTask = async (req, res) => {
  const { title, description, assignedTo, status } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      assignedTo,
      status,
    });

    await newTask.save(); // Save the task to MongoDB
    res.status(201).json({ message: 'Task created successfully!', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// @desc Get All Tasks
// @route GET /api/tasks
// @access Private
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Get all tasks
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// @desc Update a Task
// @route PUT /api/tasks/:id
// @access Private
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, assignedTo, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// @desc Delete a Task
// @route DELETE /api/tasks/:id
// @access Private
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
