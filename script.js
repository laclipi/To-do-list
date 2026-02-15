document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
  
    // Cargar tareas desde localStorage al iniciar
    loadTasks();
  
    // Evento para agregar una nueva tarea
    addTaskButton.addEventListener("click", function() {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
        taskInput.value = ""; // Limpiar el campo de entrada
      }
    });
  
    // Función para agregar una tarea
    function addTask(text) {
      const taskItem = document.createElement("li");
  
      taskItem.innerHTML = `
        <span>${text}</span>
        <button class="deleteButton">X</button>
      `;
  
      // Marcar la tarea como completada
      taskItem.addEventListener("click", function() {
        taskItem.classList.toggle("completed");
        saveTasks(); // Guardamos el estado después de marcarla
      });
  
      // Eliminar tarea
      taskItem.querySelector(".deleteButton").addEventListener("click", function(event) {
        event.stopPropagation(); // Evitar que se marque como completada al hacer click en el botón
        taskItem.remove();
        saveTasks(); // Guardamos el estado después de eliminarla
      });
  
      taskList.appendChild(taskItem);
  
      saveTasks(); // Guardamos las tareas después de agregar una nueva
    }
  
    // Función para guardar las tareas en localStorage
    function saveTasks() {
      const tasks = [];
      const taskItems = document.querySelectorAll("li");
      
      taskItems.forEach(function(taskItem) {
        const taskText = taskItem.querySelector("span").textContent;
        const isCompleted = taskItem.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
      });
  
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Función para cargar las tareas desde localStorage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
      tasks.forEach(function(task) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <span>${task.text}</span>
          <button class="deleteButton">X</button>
        `;
        if (task.completed) {
          taskItem.classList.add("completed");
        }
  
        taskItem.addEventListener("click", function() {
          taskItem.classList.toggle("completed");
          saveTasks(); // Guardamos el estado después de marcarla
        });
  
        taskItem.querySelector(".deleteButton").addEventListener("click", function(event) {
          event.stopPropagation(); // Evitar que se marque como completada
          taskItem.remove();
          saveTasks(); // Guardamos el estado después de eliminarla
        });
  
        taskList.appendChild(taskItem);
      });
    }
  });