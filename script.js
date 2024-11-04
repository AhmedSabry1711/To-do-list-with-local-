let list = document.querySelector("ol");
let taskField = document.querySelector(".task-field");
let Form = document.querySelector("form");

let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 

renderTasks(); 

Form.addEventListener("submit", function(event) {
    event.preventDefault();
    let getvalue = taskField.value;

        let task = {
            id: Date.now(),
            text: getvalue,
            completed: false
        };

        tasks.push(task); 
        saveTasks(); 
        renderTasks(); 
        taskField.value = "";

});

function renderTasks() {
    list.innerHTML = ""; 
    tasks.forEach(task => {
        list.innerHTML += `
            <li class="list">
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button onclick="checkTask(${task.id})" class="check-button">✔️</button>
                <button onclick="del(${task.id})" class="deldelete">delete</button>
            </li>
        `;
    });
}

function del(id) {
    tasks = tasks.filter(task => task.id !== id); 
    saveTasks(); 
    renderTasks(); 
}

function checkTask(id) {
    let task = tasks.find(task => task.id === id); 
    if (task) {
        task.completed = !task.completed; 
        saveTasks(); 
        renderTasks(); 
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
