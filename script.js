document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Загружаем задачи из локального хранилища
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task));

    // Добавляем задачу
    addTaskButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const task = { text: taskText, id: Date.now() };
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTask(task);
            taskInput.value = "";
        }
    });

    // Функция для отображения задачи
    function renderTask(task) {
        const li = document.createElement("li");
        li.textContent = task.text;
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    // Удаляем задачу
    function deleteTask(id) {
        const updatedTasks = tasks.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        location.reload();  // Перезагружаем страницу для обновления списка задач
    }
});