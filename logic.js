// Globals

let tasks = [];
let global_id = 0;
let filter = 0; // 0->no filter, 1->active, 2->completed

// Add new tasks
const textInput = document.getElementById('task-text-input');

textInput.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
        let content = textInput.value;

        tasks.push({
            text: content,
            finished: false,
            id: global_id,
        });

        global_id ++;
        textInput.value = "";

        renderTasks();
    }
});

// Render/rerender all tasks
function renderTasks() {

    console.log(tasks);

    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = "";

    tasks.forEach(e => {

        const newTask = document.createElement("div");
        newTask.classList.add("task");
        newTask.id = "task" + e.id;
    
        const newMarkAsDoneButton = document.createElement("button");
        newMarkAsDoneButton.innerHTML = "Mark as done";
        newMarkAsDoneButton.classList.add("mark-task-as-done-button");
        newTask.appendChild(newMarkAsDoneButton);

        const newTaskLabel = document.createElement("label");
        newTaskLabel.innerHTML = e.text;
        newTaskLabel.classList.add("task-label");
        newTask.appendChild(newTaskLabel);

        const newRemoveTaskButton = document.createElement("button");
        newRemoveTaskButton.innerHTML = "Remove task";
        newRemoveTaskButton.classList.add("remove-task-button");
        newRemoveTaskButton.onclick = function(){removeTaskWithId(e.id)};
        newTask.appendChild(newRemoveTaskButton);

        tasksContainer.appendChild(newTask);
    });
}

// Remove task with specific id 
function removeTaskWithId(id) {

    tasks = tasks.filter(e => e.id != id);

    renderTasks();
}