let  tasks =  [
    {id: 1, title: 'Go to the cinema', done: false},
    {id: 2, title: 'Go to the theatre', done: true},
    {id: 3, title: 'Learn Java Script', done: false},
    {id: 4, title: 'Finish HTML project', done: false}
];
const tasksBox = document.getElementById('tasks-box');
const tasksInfo = document.getElementById('tasks-info');
const taskTotal = document.getElementById('tasks-total')
const taskDone = document.getElementById('tasks-done')
const taskRemain = document.getElementById('tasks-remain')

const getDone = () => tasks.filter(t => t.done);
const getRemain = () => tasks.filter(t => !t.done);

function render(renderTasks = tasks){
    tasksBox.innerHTML = renderTasks.map(t => `<li class="list-group-item  d-flex">
    <span ${t.done ? 'class="done"' : ''}>${t.title}</span>
    <div class="icons-box ml-auto">
      <i data-action="toggle-task" data-id="${t.id}" class="task-action fa fa-check mr-3"></i>
      <i data-action="delete-task" data-id="${t.id}" class="task-action fa fa-trash"></i>
    </div>
  </li>`).join('');
    const len = tasks.length;
  
    if(!len){
        tasksInfo.style.display  = 'none'
        return;
    }
  tasksInfo.style.display  = 'block' 
  taskTotal.textContent = len;
  taskDone.textContent = getDone().length;
  taskRemain.textContent = getRemain().length;
}

function handleTasks(e){
    const btn = e.target;
    if(!btn.classList.contains('task-action')) {
        return;
    }
    const id = Number(btn.dataset.id);
    switch(btn.dataset.action) {
        case 'toggle-task':
            tasks = tasks.map(t => t.id !== id ? t : {...t, done: !t.done})
            render()
            break;
        case 'delete-task':
            if(!confirm('Are you sure ? ')) {
                return;
            }
            tasks = tasks.filter(t => t.id !== id)
            render();
            break;
    }
}
function getId(){
    return Math.floor(Math.random() * 1e8  + new Date().getTime()).toString(36);
}

render();

function handleSubmit(e){
    const f = e.target;
    if(f.id !== 'task-form'){
        return;
    }
    e.preventDefault();
    const titleEl = f.title;
    const title = titleEl.value;
    if(title.length < 5) {
        alert("Task must have at least 5 symbols");
        return;
    }
    titleEl.value = '';
    const newTask = {id: getId(), title, done: false }
    tasks.push(newTask)
    render();
}

function handleChange(e){
    const sel = e.target;
    if(sel.id !== "filter-tasks") {
        return;
    }
    const value = Number(sel.value);
    let newTasks = tasks;
    switch(value) {
        case 2:
            newTasks = getDone();
            break;
        case 3:
            newTasks = getRemain();
            break;
    }
    render(newTasks);
}
function handleFilter(e){
    const el = e.target;
    if(el.id !== 'search-box'){
        return;
    }
    const val = el.value;
    const newTasks = tasks.filter(t => t.title.toLowerCase().includes(val.toLowerCase()))
    render(newTasks);  
}


document.addEventListener('submit', handleSubmit)
document.addEventListener('click', handleTasks)
document.addEventListener('change', handleChange)
document.addEventListener('keyup', handleFilter)