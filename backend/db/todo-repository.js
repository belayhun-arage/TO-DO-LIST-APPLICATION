import db from './index.js';

// Function to create a new todo
const createTodo = async ({ title, description })=> {
  const query = 'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *';
  const values = [title, description];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
}

// Function to retrieve all todos
const getAllTodos=  async ()=> {
  const query = 'SELECT * FROM todos';

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

// Function to update a todo
const updateTodo = async (id, title, description, completed)=> {
  const query = 'UPDATE todos SET title = $2, description = $3, completed = $4 WHERE id = $1 RETURNING *';
  const values = [id, title, description, completed];

  try {
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

export default {
    createTodo,
    getAllTodos,
    updateTodo
}