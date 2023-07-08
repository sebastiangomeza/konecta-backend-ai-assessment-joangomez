const Task = require('../models/Task');

// Crear una tarea
exports.createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const userId = req.user._id;

    const task = new Task({ user_id: userId, title, description, completed });
    await task.save();

    res.status(201).json({ message: 'Tarea creada exitosamente' });
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener todas las tareas del usuario
exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ user_id: userId });
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


// Obtener una tarea por su ID
exports.getTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }
      res.json(task);
    } catch (error) {
      console.error('Error al obtener la tarea:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };
  
  // Eliminar una tarea
  exports.deleteTask = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      const deletedTask = await Task.findByIdAndRemove(taskId);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }
  
      res.json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };
  