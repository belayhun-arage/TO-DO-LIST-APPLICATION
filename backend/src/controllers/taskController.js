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
  console.log("Adding new task")
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

const updateStatus = async (req, res,next) => {
  const { completed } = req.body;
  const id = req.params.id;
  console.log({ completed })
  try {
    const updatedTodo = await todoRepo.updateTodoStatus(id,completed);
    res.status(201).json(updatedTodo);
  } catch (error) {
    next(new CustomError(500, 'Error updating task'));
  }
};

const updateTask = async (req, res,next) => {
    const { title, description,completed } = req.body;
    const id = req.params.id;
    console.log({ title, description,completed })
    try {
      const updatedTodo = await todoRepo.updateTodo(id, title, description,completed);
      res.status(201).json(updatedTodo);
    } catch (error) {
      next(new CustomError(500, 'Error updating task'));
    }
  };

  const deleteTask = async (req, res,next) => {
   
    const id = req.params.id;


    console.log("Deleting Task"+id)
    try {
      const updatedTodo = await todoRepo.deleteTodo(id);
      console.log("After Deleting Task"+updatedTodo)
      res.status(201).json(updatedTodo);
    } catch (error) {
      next(new CustomError(500, 'Error deleting tasks'));
    }
  };

export default{
    getAllTasks,
    createTask,
    updateTask,
    updateStatus,
    deleteTask
}