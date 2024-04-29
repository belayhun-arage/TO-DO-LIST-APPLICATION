import  { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize('postgres://username:password@localhost:5432/todo_db');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default Task;
