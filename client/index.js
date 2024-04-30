const baseUrl = 'https://to-do-list-application-3jcq.onrender.com/todos';

// get html elements by their id
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// load available todos from the database
document.addEventListener('DOMContentLoaded', async () => {
  await fetchAndDisplayTasks();
});

document.getElementById("todo-form").addEventListener("submit", function(event) {
  event.preventDefault();
});

// loader function
async function fetchAndDisplayTasks() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const tasks = await response.json();

    listContainer.innerHTML = ''; // Clear existing list items
    tasks.forEach(task => {
      const listItem = createTaskListItem(task);
      listContainer.appendChild(listItem);
    });

    updateCounters(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// save new upcoming tasks
async function addTask() {
    
    const inputBox = document.getElementById('input-box');
    
    const inputBoxDescription = document.getElementById('input-box-description');
   
    const title = inputBox.value;
    const description=inputBoxDescription.value
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title:title,description:description})
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      await fetchAndDisplayTasks(); // Refresh tasks after adding
    } catch (error) {
      console.error('Error adding task:', error);
    }
    inputBox.value = "";
    inputBoxDescription.value = "";
}

async function updateTask(taskId, taskData) {
  try {
    const response = await fetch(`${baseUrl}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    await fetchAndDisplayTasks(); // Refresh tasks after updating
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

async function updateTaskStatus(taskId, taskData) {
  try {
    const response = await fetch(`${baseUrl}/status/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    await fetchAndDisplayTasks(); // Refresh tasks after updating
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

async function deleteTask(taskId) {
  try {
    const response = await fetch(`${baseUrl}/${taskId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    await fetchAndDisplayTasks(); // Refresh tasks after deleting
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

function updateCounters(tasks) {
  const completedTasks = tasks.filter(task => task.completed).length;
  const uncompletedTasks = tasks.filter(task => !task.completed).length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

inputBox.addEventListener("keyup", async function (event) {
  if (event.key === "Enter") {
    const task = {
      title: inputBox.value.trim(),
      description: ""
    };
    await addTask(task);
    inputBox.value = ""; // Clear input box
  }
});

function createTaskListItem(task) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <div id="todo" class="task-details">
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <div data-task-id="${task.id}" style="flex: 1;">
        <div data-task-title class="task-title">${task.title}</div>
        <div data-task-description class="task-description">${task.description}</div>
      </div>
    </div>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    `;
  if (task.completed) {
    listItem.classList.add("completed");
  }
  return listItem;
}

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('edit-btn')) {
    const modal = document.getElementById('updateModal');
    const confirmUpdateBtn = document.getElementById('confirmUpdate');
    const taskId = event.target.parentElement.querySelector('div[data-task-id]').dataset.taskId;
    const taskSpan = event.target.parentElement.querySelector('div[data-task-title]');
    const descriptionSpan = event.target.parentElement.querySelector('div[data-task-description]');
    const updateInput = document.getElementById('updateInput');
    const updateDescription = document.getElementById('updateDescription');

    updateInput.value = taskSpan.textContent.trim();
    updateDescription.value = descriptionSpan.textContent.trim();
    modal.style.display = 'block';

    // Close the modal when the close button or anywhere outside the modal is clicked
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };

    // Close the modal when the close button is clicked
    document.querySelector('#updateModal .close').addEventListener('click', function() {
      modal.style.display = 'none';
    });

    // Update the task when the confirm update button is clicked
    confirmUpdateBtn.addEventListener('click', async function() {
      const updatedTitle = updateInput.value.trim();
      const updatedDescription = updateDescription.value.trim();
      if (updatedTitle) {
        modal.style.display = 'none';
        const taskData = { title: updatedTitle,description:updatedDescription };
        await updateTask(taskId, taskData);
      }
    });
  }
  if (event.target.classList.contains('delete-btn')) {
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const taskId = event.target.parentElement.querySelector('div[data-task-id]').dataset.taskId;

    deleteModal.style.display = 'block';

    // Close the delete modal when the close button or anywhere outside the modal is clicked
    window.onclick = function(event) {
      if (event.target == deleteModal) {
        deleteModal.style.display = 'none';
      }
    };

    // Close the delete modal when the close button is clicked
    deleteModal.querySelector('.close').addEventListener('click', function() {
      deleteModal.style.display = 'none';
    });

    // Delete the task when the confirm delete button is clicked
    confirmDeleteBtn.addEventListener('click', async function() {
      deleteModal.style.display = 'none';
      await deleteTask(taskId);
    });
  }
});

async function updateTaskCompletion(taskId, completed) {
  try {
    const taskData = {completed };
    await updateTaskStatus(taskId, taskData);
  } catch (error) {
    console.error('Error updating task completion:', error);
  }
}

listContainer.addEventListener('change', async (event) => {
  const checkbox = event.target.closest('input[type="checkbox"]');
  if (event.target.type === 'checkbox') {
    const listItem = event.target.closest('li');
    const taskId = listItem.querySelector('div[data-task-id]').dataset.taskId;
    const completed = checkbox.checked;
    await updateTaskCompletion(taskId, completed);
  }
});
