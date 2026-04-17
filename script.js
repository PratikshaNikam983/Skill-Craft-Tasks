let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("taskDate").value;

  if (!text) {
    alert("Enter task!");
    return;
  }

  tasks.push({
    text,
    date,
    completed: false
  });

  document.getElementById("taskInput").value = "";
  document.getElementById("taskDate").value = "";

  saveTasks();
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <span class="${task.completed ? "completed" : ""}">
          ${task.text}
        </span><br>
        <small>${task.date || ""}</small>
      </div>

      <div class="actions">
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="editTask(${index})">✏</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newTask = prompt("Edit task:", tasks[index].text);
  if (newTask !== null) {
    tasks[index].text = newTask.trim();
    saveTasks();
    renderTasks();
  }
}

renderTasks();