const $taskInput = document.getElementById("task-input"),
  $addBtn = document.getElementById("add-btn"),
  $taskList = document.getElementById("task-list"),
  $filterInput = document.getElementById("filter-input");

const tasks = getLocalTask();
showTask(tasks);

function addTask() {
  const task = $taskInput.value;
  if (task && !tasks.includes(task)) {
    tasks.push(task);
    localStorage.setItem("tasks", tasks);
  }
  $taskInput.value = "";
  showTask(tasks);
}

function showTask(tasks) {
  $taskList.innerHTML = "";
  for (let task of tasks) {
    $taskList.innerHTML += `<li>${task}<button onclick="deleteTask(event)">X</button></li>`;
  }
}

function getLocalTask() {
  const tasks = localStorage.getItem("tasks");
  if (tasks != null) {
    return tasks.split(",");
  } else {
    return [];
  }
}

function deleteTask(event) {
  const target = event.target.parentNode.firstChild;
  if (confirm("Delete task?")) {
    tasks.splice(tasks.indexOf(target), 1);
    if (tasks.length > 0) {
      localStorage.setItem("tasks", tasks);
    } else {
      localStorage.removeItem("tasks");
    }
    showTask(tasks);
  }
}

function filter() {
  const value = $filterInput.value;
  const result = [];
  for (let task of tasks) {
    if (task.includes(value)) {
      result.push(task);
    }
  }
  showTask(result);
}
