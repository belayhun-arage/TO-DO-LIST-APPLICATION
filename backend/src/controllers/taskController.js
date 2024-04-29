import CustomError from '../utils/error.js';

import todoRepo from '../../db/todo-repository.js'

const getAllTasks = async (req, res,next) => {
  try {
    const allTodos = await todoRepo.getAllTodos();
    res.json(allTodos);
  } catch (error) {
    next(new CustomError(500, 'Error fetching tasks'));
  }
};

const createTask = async (req, res,next) => {
  const { title, description } = req.body;
  try {
    if (!title) {
        throw new CustomError(400, 'Title is required');
    }

    const newTodo = await todoRepo.createTodo({ title, description });
    res.status(201).json(newTodo);
  } catch (error) {
    next(new CustomError(500, 'Error creating tasks'));
  }
};

const updateTask = async (req, res,next) => {
    const { title, description } = req.body;
    const { id } = req.query;
    try {
      if (!title) {
          throw new CustomError(400, 'Title is required');
      }
  
      const updatedTodo = await todoRepo.updateTodo(id, title, description);
      res.status(201).json(updatedTodo);
    } catch (error) {
      next(new CustomError(500, 'Error creating tasks'));
    }
  };

export default{
    getAllTasks,
    createTask,
    updateTask
}