const addTaskBtn = document.getElementById("add-task-btn");
const deskTaskInput = document.getElementById("description-task");
const todosWrapper = document.querySelector(".todos-wrapper");

let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task (description){
    this.description = description;
    this.completed = false;    
}

const filterTask = ()=>{
    const activeTask = tasks.length && tasks.filter(item => item.completed === false);
    const complitedTask = tasks.length && tasks.filter(item => item.completed === true);
    tasks = [...activeTask, ...complitedTask];
}

const completeTask = index =>{
    tasks[index].completed = !tasks[index].completed
    if(tasks[index].completed){
        todoItemElems[index].classList.add('checked')
    } else {
        todoItemElems[index].classList.remove('checked')
    }
    updateLokal();
    fillHtmlList();
}

const deleteTask = index =>{    
    todoItemElems[index].classList.add('deletion')
    setTimeout(()=>{
        tasks.splice(index, 1);
        updateLokal();
        fillHtmlList();
    }, 800)
}


const createTemplate = (task, index) => {
    return todosWrapper.innerHTML += (`<div class="todo-item ${task.completed ? 'checked' : ''}">
                                            <div class="description"> ${task.description} </div>
                                            <div class="buttons">
                                                <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                                                <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
                                            </div>
                                        </div> `)
    
    
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = '';
    if(tasks.length > 0){
        filterTask();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML = createTemplate(item, index)
        });
        todoItemElems = document.querySelectorAll(".todo-item");
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

