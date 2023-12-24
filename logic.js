// Globals

let tasks = [];
let global_id = 0;
let filter = 0; // 0->no filter, 1->active, 2->completed

// Example task
tasks.push({
    text: "This is an example task!",
    finished: false,
    id: global_id,
});
global_id++;

tasks.push({
    text: "This is another example task!",
    finished: false,
    id: global_id,
});
global_id++;

renderTasks();

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

    const tasksLeftLabel = document.getElementById("tasks-left-label");
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
        newMarkAsDoneButton.classList.add("mark-task-as-done-button");
        newMarkAsDoneButton.onclick = function(){switchFinishedStateOfClassWithId(e.id)};
        newTask.appendChild(newMarkAsDoneButton);

        const newTaskLabel = document.createElement("label");
        newTaskLabel.innerHTML = e.text;
        newTaskLabel.classList.add("task-label");
        newTask.appendChild(newTaskLabel);

        const newRemoveTaskButton = document.createElement("button");
        newRemoveTaskButton.classList.add("remove-task-button");
        newRemoveTaskButton.onclick = function(){removeTaskWithId(e.id)};
        newTask.appendChild(newRemoveTaskButton);

        tasksContainer.appendChild(newTask);
    });

    const tasksLeft = tasks.filter(t => t.finished === false);
    tasksLeftLabel.innerHTML = "Items left: " + tasksLeft.length + "/" + tasks.length;
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

    [...document.getElementsByClassName("filter-button")].forEach(b => {
        b.classList.remove("active-filter-button");
    });

    document.getElementById("filter-all-button").classList.add("active-filter-button");

    filter = 0;
    renderTasks();
}

function activeFilter() {

    [...document.getElementsByClassName("filter-button")].forEach(b => {
        b.classList.remove("active-filter-button");
    });

    document.getElementById("filter-active-button").classList.add("active-filter-button");

    filter = 1;
    renderTasks();
}

function finishedFilter() {

    [...document.getElementsByClassName("filter-button")].forEach(b => {
        b.classList.remove("active-filter-button");
    });

    document.getElementById("filter-finished-button").classList.add("active-filter-button");

    filter = 2;
    renderTasks();
}

// Remove all tasks which are completed
function removeAllCompletedTasks() {

    tasks = tasks.filter(e => e.finished === false);
    renderTasks();
}