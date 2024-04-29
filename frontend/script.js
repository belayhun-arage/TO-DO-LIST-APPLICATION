const taskListContainer = document.getElementById('taskList')
const addBtn = document.getElementById('addBtn')
const taskForm = document.querySelector('taskForm')
let baseUrl='http://localhost:3000/todos'

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch and display tasks
    const response = await fetch(baseUrl);
    const tasks = await response.json();
  
    tasks.forEach(task => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <input type="checkbox" id="task${task.id}" ${task.completed ? 'checked' : ''}>
        <label for="task${task.id}">${task.description}</label>
        <button class="deleteButton" data-taskid="${task.id}">Delete</button>
      `;
      taskListContainer.appendChild(listItem);
    });
  
    // Add event listener for task completion
    taskListContainer.addEventListener('change', async (event) => {
      if (event.target.type === 'checkbox') {
        const taskId = event.target.id.slice(4); // Remove 'task' prefix
        const completed = event.target.checked;
        await fetch(`${baseUrl}/${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed }),
        });
      }
    });
  
    // Add event listener for task deletion
    taskListContainer.addEventListener('click', async (event) => {
      if (event.target.classList.contains('deleteButton')) {
        const taskId = event.target.dataset.taskid;
        await fetch(`${baseUrl}/${taskId}`, {
          method: 'DELETE',
        });
        event.target.parentElement.remove();
      }
    });
  
    // Add event listener for task creation
    taskForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const taskDescription = document.getElementById('taskDescription').value;
      await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: taskDescription }),
      });
      location.reload(); // Refresh the page to update the task list
    });
  });