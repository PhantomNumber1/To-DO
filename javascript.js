document.addEventListener("DOMContentLoaded", function() {
    init();
    loadTasksFromStorage();
});

var taskCounter = 1;

var init = function() {
    document.getElementById("add-task").addEventListener("click", function() {
        let newTitle = document.getElementById("title").value.trim(),
            newContent = document.getElementById("content").value.trim();

        if (newTitle !== "") {
            addTask(newTitle, newContent);
        } else {
            alert("Enter task.");
        }
    });
    document.getElementById("clear-tasks").addEventListener("click", function() {
        clearAllTasks();
    });
};

var addTask = function(title, content) {
    var taskList = document.getElementById("task-list");

    var newTask = document.createElement("div");
    newTask.classList.add("child");

    var taskTitle = document.createElement("h2");
    taskTitle.textContent =  title;

    var taskContent = document.createElement("p");
    taskContent.textContent = content;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        deleteTask(newTask);
    }); 

    newTask.appendChild(taskTitle);
    newTask.appendChild(taskContent);
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);
    resetForm();

    saveTaskToStorage( title, content,taskCounter);

    taskCounter++;
};

var deleteTask = function(taskElement) {
    taskElement.parentNode.removeChild(taskElement);
    removeTaskFromStorage(taskElement.querySelector("h2").textContent);
};

var removeTaskFromStorage = function(taskTitle) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var updatedTasks = tasks.filter(function(task) {
        return task.title !== taskTitle;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};

var clearAllTasks = function() {
    var taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
    taskCounter = 1; // Reset task counter
};

var resetForm = function() {
    document.getElementById("form").reset();
};

var saveTaskToStorage = function(title,content) {
    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks) || [];
    let task = {title: title, content: content};
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

var loadTasksFromStorage = function() {
    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);
    taskList={};
    clearAllTasks();
    tasks.forEach(function(task) {
        addTask(task.title, task.content);
    });
};

