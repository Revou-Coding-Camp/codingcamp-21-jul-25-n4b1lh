let tasks = [];
let currentFilter = "all"; // 'all', 'pending', or 'completed'

function addTask() {
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");

    if (taskInput.value === "" || dateInput.value === "") {
        alert("Please enter a task and a date.");
        return;
    }

    tasks.push({
        title: taskInput.value,
        date: dateInput.value,
        completed: false,
    });

    taskInput.value = "";
    dateInput.value = "";

    renderTasks();
}

function removeAllTask() {
    tasks = [];
    renderTasks();
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("todo-list");
    taskList.innerHTML = "";

    let filteredTasks = tasks;
    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<p>No tasks available</p>`;
        return;
    }

    filteredTasks.forEach((task, index) => {
        taskList.innerHTML += `
            <li class="todo-item flex justify-between items-center bg-white p-4 mb-2 border rounded">
                <div>
                    <p class="${task.completed ? 'line-through text-gray-400' : ''} font-medium">
                        ${task.title} <span class="text-sm text-gray-500">(${task.date})</span>
                    </p>
                </div>
                <div class="flex gap-2">
                    <button class="px-[10px] py-[2px] bg-green-500 text-white rounded-md text-sm" onclick="completeTask(${index})">
                        ${task.completed ? "Undo" : "Complete"}
                    </button>
                    <button class="px-[10px] py-[2px] bg-red-500 text-white rounded-md text-sm" onclick="deleteTask(${index})">
                        Delete
                    </button>
                </div>
            </li>
        `;
    });
}
