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

        if (filter === 1 && e.finished === true) {
            return;
        }

        if (filter === 2 && e.finished === false) {
            return;
        }

        const newTask = document.createElement("div");
        newTask.classList.add("task");
        newTask.id = "task" + e.id;

        if (e.finished) {
            newTask.classList.add("task-finished");
        }
    
        const newMarkAsDoneButton = document.createElement("button");
        newMarkAsDoneButton.innerHTML = "Mark as done";
        newMarkAsDoneButton.classList.add("mark-task-as-done-button");
        newMarkAsDoneButton.onclick = function(){switchFinishedStateOfClassWithId(e.id)};
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

// Mark tash with specific id as finished
function switchFinishedStateOfClassWithId(id) {

    tasks.forEach(e => {
        if (e.id === id) {
            e.finished = !e.finished;
        }
    })

    renderTasks();
}

// Mark all tasks as done
function markAllTasksAsDone() {

    tasks.forEach(e => {
        e.finished = true;
    })

    renderTasks();
}

// Filters
function removeFilter() {

    filter = 0;
    renderTasks();
}

function activeFilter() {

    filter = 1;
    renderTasks();
}

function finishedFilter() {

    filter = 2;
    renderTasks();
}

// Remove all tasks which are completed
function removeAllCompletedTasks() {

    tasks = tasks.filter(e => e.finished === false);
    renderTasks();
}