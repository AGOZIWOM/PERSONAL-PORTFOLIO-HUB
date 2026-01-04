let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let activeCategory = "all";
let activeFilter = "all";
let focusMode = false;
let focusedTaskId = null;

// FIX: Track edit mode
let editingTaskId = null;

/* DOM */
const taskList = document.getElementById("taskList");
const modal = document.getElementById("taskModal");
const taskTitle = document.getElementById("taskTitle");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const focusToggle = document.getElementById("focusToggle");

/* STORAGE */
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* FOCUS MODE TOGGLE */
focusToggle.addEventListener("click", () => {
  focusMode = !focusMode;

  // FIX: Reset focused task when turning OFF
  if (!focusMode) {
    focusedTaskId = null;
  }

  render();
});

/* RENDER */
function render() {
  taskList.innerHTML = "";

  tasks
    .filter(t => activeCategory === "all" || t.category === activeCategory)
    .filter(t => {
      if (activeFilter === "active") return !t.completed;
      if (activeFilter === "completed") return t.completed;
      return true;
    })
    .forEach(task => {
      const el = document.createElement("div");
      el.className = "task";
      el.dataset.id = task.id;

      if (task.completed) el.classList.add("completed");

      // FIX: Correct focus mode logic
      if (focusMode && focusedTaskId && task.id !== focusedTaskId) {
        el.classList.add("blurred");
      }

      if (focusMode && task.id === focusedTaskId) {
        el.classList.add("focused");
      }

      el.innerHTML = `
        <div class="task-left">
          <input type="checkbox" ${task.completed ? "checked" : ""} />
          <div class="task-info">
            <h4>${task.title}</h4>
            <span class="category">${task.category}</span>
          </div>
        </div>

        <div class="task-right">
          <span class="priority ${task.priority}">
            ${task.priority.toUpperCase()}
          </span>
          <button class="icon-btn edit">✏️</button>
          <button class="icon-btn del">🗑️</button>
        </div>
      `;

      /* COMPLETE */
      el.querySelector("input").onclick = e => {
        e.stopPropagation();
        task.completed = !task.completed;
        save();
        render();
      };

      /* DELETE */
      el.querySelector(".del").onclick = e => {
        e.stopPropagation();
        tasks = tasks.filter(t => t.id !== task.id);
        save();
        render();
      };

      /* EDIT */
      el.querySelector(".edit").onclick = e => {
        e.stopPropagation();
        openEditModal(task); // FIX: pass correct task
      };

      /* SELECT FOCUS TASK */
      el.onclick = () => {
        if (!focusMode) return;
        focusedTaskId = task.id;
        render();
      };

      taskList.appendChild(el);
    });
}

/* OPEN EDIT MODAL */
function openEditModal(task) {
  editingTaskId = task.id; // FIX: track editing
  taskTitle.value = task.title;
  taskCategory.value = task.category;
  taskPriority.value = task.priority;
  modal.classList.remove("hidden");
}

/* ADD TASK BUTTON */
document.getElementById("addTaskBtn").onclick = () => {
  if (focusMode) return; // FIX: block adding during focus
  editingTaskId = null;
  taskTitle.value = "";
  modal.classList.remove("hidden");
};

/* SAVE TASK (ADD OR EDIT) */
document.getElementById("saveTask").onclick = () => {
  if (!taskTitle.value.trim()) return;

  if (editingTaskId) {
    // FIX: EDIT existing task
    const task = tasks.find(t => t.id === editingTaskId);
    task.title = taskTitle.value;
    task.category = taskCategory.value;
    task.priority = taskPriority.value;
    editingTaskId = null;
  } else {
    // ADD new task
    tasks.push({
      id: Date.now(),
      title: taskTitle.value,
      category: taskCategory.value,
      priority: taskPriority.value,
      completed: false
    });
  }

  modal.classList.add("hidden");
  save();
  render();
};

/* CANCEL MODAL */
document.getElementById("cancelTask").onclick = () => {
  modal.classList.add("hidden");
  editingTaskId = null;
};

/* CATEGORY FILTER */
document.querySelectorAll("[data-category]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll("[data-category]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    focusedTaskId = null;
    render();
  };
});

/* STATUS FILTER */
document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    render();
  };
});

render();
