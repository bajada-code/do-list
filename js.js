document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');

      const taskText = document.createElement('span');
      taskText.textContent = task;
      taskText.addEventListener('click', () => editTask(index));

      const actions = document.createElement('div');
      actions.classList.add('actions');

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteTask(index));

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.classList.add('edit');
      editBtn.addEventListener('click', () => editTask(index));

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(taskText);
      li.appendChild(actions);
      taskList.appendChild(li);
    });
  };

  const addTask = (e) => {
    e.preventDefault();
    const newTask = taskInput.value.trim();
    if (newTask) {
      tasks.push(newTask);
      taskInput.value = '';
      saveTasks();
      renderTasks();
    }
  };

  const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  const editTask = (index) => {
    const li = taskList.children[index];
    const oldText = tasks[index];

    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldText;

    input.addEventListener('blur', () => {
      tasks[index] = input.value.trim() || oldText;
      saveTasks();
      renderTasks();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') input.blur();
    });

    li.innerHTML = '';
    li.classList.add('editing');
    li.appendChild(input);
    input.focus();
  };

  taskForm.addEventListener('submit', addTask);

  renderTasks();
});
