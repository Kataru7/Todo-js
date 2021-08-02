const addTaskBtn = document.getElementById("add-task-btn");
const deskTaskInput = document.getElementById("description-task");
const todosWrapper = document.querySelector(".todos-wrapper");

let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task (description){
    this.description = description;
    this.completed = false;    
}



const createTemplate = (task, index) => {
    return todosWrapper.innerHTML += (`<div class="todo-item ${task.completed ? 'checked' : ''}">
                                            <div class="description"> ${task.description} </div>
                                            <div class="buttons">
                                                <input class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                                                <button class="btn-delete">Delete</button>
                                            </div>
                                        </div> `)
    
    
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = '';
    if(tasks.length > 0){
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML = createTemplate(item, index)
        });
    }
}

fillHtmlList();

function updateLokal (){
    localStorage.setItem('tasks', JSON.stringify(tasks))
};

addTaskBtn.addEventListener("click", ()=>{
    tasks.push(new Task(deskTaskInput.value))
    updateLokal();
    fillHtmlList();
    deskTaskInput.value = '';

});