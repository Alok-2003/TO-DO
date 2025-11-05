let btn = document.querySelector(".Addbtn");
let ol =  document.querySelector("ol");
let inp = document.querySelector("input");
let filterState = "all"; // all | active | completed
let tasks = [];

function saveTasks() {
  localStorage.setItem("todo_tasks", JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const data = JSON.parse(localStorage.getItem("todo_tasks"));
    tasks = Array.isArray(data) ? data : [];
  } catch (e) {
    tasks = [];
  }
}

function createTask(text) {
  return { id: Date.now().toString(), text, completed: false };
}

function addTask(text) {
  const t = createTask(text);
  tasks.push(t);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  const t = tasks.find(t => t.id === id);
  if (t) {
    t.completed = !t.completed;
    saveTasks();
    renderTasks();
  }
}

function editTask(id, newText) {
  const t = tasks.find(t => t.id === id);
  if (t && newText.trim()) {
    t.text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
}

function applyFilter(list) {
  if (filterState === "active") return list.filter(t => !t.completed);
  if (filterState === "completed") return list.filter(t => t.completed);
  return list;
}

function renderTasks() {
  ol.innerHTML = "";
  const toRender = applyFilter(tasks);
  toRender.forEach(t => {
    const li = document.createElement("li");
    li.dataset.id = t.id;
    if (t.completed) li.classList.add("completed");

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = t.text;
    li.appendChild(textSpan);

    const actions = document.createElement("div");

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle";
    toggleBtn.textContent = t.completed ? "Undo" : "Done";
    actions.appendChild(toggleBtn);

    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.classList.add("delete");
    actions.appendChild(delBtn);

    li.appendChild(actions);
    ol.appendChild(li);

    // inline edit on double click
    textSpan.addEventListener("dblclick", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = t.text;
      input.className = "edit";
      li.replaceChild(input, textSpan);
      input.focus();
      const commit = () => {
        editTask(t.id, input.value);
      };
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") renderTasks();
      });
    });
  });
  updateFooter();
}

function updateFooter() {
  const countEl = document.querySelector(".count");
  if (countEl) {
    const remaining = tasks.filter(t => !t.completed).length;
    countEl.textContent = `${remaining} items left`;
  }
}

btn.addEventListener("click", function() {
    let value = inp.value.trim();
    // Do not create a list element if the user input is null or space.
    if (value) {
      addTask(value);
      inp.value = "";
    }
});

ol.addEventListener("click", function (event) {
    const target = event.target;
    const li = target.closest("li");
    if (!li) return;
    const id = li.dataset.id;
    if (target.classList.contains("delete")) {
      deleteTask(id);
    } else if (target.classList.contains("toggle")) {
      toggleTask(id);
    }
});

// filter buttons and clear completed
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (btn) {
    filterState = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
    renderTasks();
  }
  if (e.target && e.target.classList.contains("clear-completed")) {
    clearCompleted();
  }
});

// initialize
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  renderTasks();
});

// Add via Enter key on input
inp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = inp.value.trim();
    if (value) {
      addTask(value);
      inp.value = "";
    }
  }
});