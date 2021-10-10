const container = document.getElementById("todo-list");
let todoItems = [];
const countContainer = document.getElementById('todo-count-text');
const filterContainer = document.querySelector('.filters');


function todoItem(){
    todoItems = JSON.parse(localStorage.getItem('items')) || [];
}

function createTodo(todoName) {
    const currentTodo = container.innerHTML;
    const addTodo =`
    <li>
        <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${todoName}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${todoName}" />
    </li>
`;
    container.innerHTML =  currentTodo + addTodo;
}

//Todo 추가하기
function addTodo() {
    const todoName = document.getElementById("new-todo-title");
    if(todoName.value === '' || todoName.value === null)
    return;
    
    if(window.event.keyCode == 13){
        createTodo(todoName.value);
        updateStorage(todoName.value, false);
        document.getElementById("new-todo-title").value = "";
        updateCount(+1);
    }
}

//Todo 상태변경
function checkTodo(e) {
    const event = e || window.event;
    if(!event.target.classList.contains('toggle')){
        return;
    }
    const targetContainer = event.target.parentElement.parentElement
    const targetTodoName = event.target.nextSibling.nextSibling.innerText;
    
    
    todoItems.forEach((todo) => { 
        todo.todoName === targetTodoName ? todo.todoStatus = !todo.todoStatus : ''
    })

    localStorage.setItem('todoList',JSON.stringify(todoItems));
    targetContainer.classList.toggle('completed');
}

//Todo 삭제하기
function deleteTodo(e) {
    const event = e || window.event;
    if(!event.target.classList.contains('destroy')){
        return;
    }
    container.removeChild(event.target.parentElement.parentElement);
    updateCount(-1);
}

//게시물 개수 수정
function updateCount(updateCount){
    const count = countContainer.innerText;
    countContainer.innerText = Number(count)+Number(updateCount);
}

function calCount(){
    const totalCount = container.childElementCount;
    console.log(totalCount);
    countContainer.innerText = totalCount;
}

//스토리지 업데이트
function updateStorage(todoName, todoStatus){
    todoItems.push({todoName,todoStatus});
    localStorage.setItem('items',JSON.stringify(todoItems))
}


//Todo 전체보기
function showAllTodo(e){
    const event = e || window.event;
    if(!event.target.classList.contains('all')){
        return;
    }
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    let temp = '';
        todoList.forEach((todo) => {
            temp = temp + 
        `<li class = ${todo.todoStatus ? 'completed' : ''}>
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.todoStatus ? 'checked' : ''}/>
                <label class="label">${todo.todoName}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.todoName}" />
        </li>`
        })
        container.innerHTML = temp;
    calCount();
}

//Todo 해야할일 보기
function noCompleteTodo(e){
    const event = e || window.event;
    if(!event.target.classList.contains('active')) {
        return;
    }

    const todoList = JSON.parse(localStorage.getItem('todoList'));
    let temp = '';
    todoList.filter((todo) => todo.todoStatus === false).forEach((noCompleteTodo) => {
        temp = temp + 
        `<li class = ${noCompleteTodo.todoStatus? 'completed': ''}>
            <div class="view">
                <input class="toggle" type="checkbox" ${noCompleteTodo.todoStatus? 'checked':''}/>
                <label class="label">${noCompleteTodo.todoName}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${noCompleteTodo.todoName}" />
        </li>`
    })
    container.innerHTML = temp;
    calCount();

}

//Todo 완료한일 보기
function completeTodo(e){
    const event = e || window.event;
    if(!event.target.classList.contains('completed')){
        return;
    }
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    const completeTodo = todoList.filter((todo) => todo.todoStatus === true);
    let temp='';

    todoList.filter((todo) => todo.todoStatus === true).forEach((completeTodo) => {
        
        temp = temp +`
        <li class='completed'>
            <div class="view">
                <input class="toggle" type="checkbox" checked/>
                <label class="label">${completeTodo.todoName}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${completeTodo.todoName}" />
        </li>
    `;
    });
   container.innerHTML = temp;
   calCount();
}



filterContainer.addEventListener('click', completeTodo);
filterContainer.addEventListener('click', showAllTodo);
filterContainer.addEventListener('click', noCompleteTodo);

//Todo 상태변경 이벤트 핸들러
container.addEventListener('click', checkTodo);
//Todo 삭제 이벤트 핸들러
container.addEventListener('click', deleteTodo);
//Todo 추가 이벤트 핸들러
const inputTodo = document.getElementById('new-todo-title');
inputTodo.addEventListener('keyup', addTodo);



