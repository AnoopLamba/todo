var taskForm = document.getElementById("taskForm");
var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");
var totalTasks = document.getElementById("totalTasks");
var taskArr = [];
var taskCounter = 0;

// when submitting the form
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var userInput = taskInput.value.trim();
  if (userInput !== "") {
    const newTask = {
      taskId: Date.now(),
      taskText: userInput,
      taskComplete: false,
    };

    taskArr.push(newTask);
    reRenderTaskList();
    taskInput.value = "";
  }
});

// function to delete tasks
function deleteTask(id) {
  taskArr = taskArr.filter((task) => task.taskId !== id);
  reRenderTaskList();
}

// function to toggle tasks
function toggleTask(id) {
  taskArr.forEach((task) => {
    if (task.taskId === id) {
      task.taskComplete = !task.taskComplete;
    }
  });

  reRenderTaskList();
}

// this function is important to re-render the updated list
function reRenderTaskList() {
  taskList.innerHTML = "";
  updateTaskCounter();

  taskArr.forEach((task) => {
    let listItem = document.createElement("li");
    listItem.classList.toggle("checked", task.taskComplete);

    listItem.innerHTML = `
        <span class="litext">${task.taskText}</span>
        <div class="liButtons">
            <button onclick="toggleTask(${task.taskId})">
                <img src="./svg/check.svg" alt="toggle task" />
            </button>
            <button onclick="deleteTask(${task.taskId})">
                <img src="./svg/delete.svg" alt="delete task" />
            </button>
        </div>
    `;

    taskList.appendChild(listItem);
  });
}

// function to update the tasks counting
function updateTaskCounter() {
  taskCounter = taskArr.filter((task) => !task.taskComplete).length;
  totalTasks.innerHTML = taskCounter;
}
