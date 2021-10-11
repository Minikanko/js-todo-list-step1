import showTodo from './template.js';
import showCount from './showCount.js';
import completeTodo from './filter/complete.js';
import noCompleteTodo from './filter/noComplete.js';
import showAllTodo from './filter/all.js'

const container = document.getElementById("todo-list");
const filterContainer = document.querySelector('.filters');
const inputTodo = document.getElementById('new-todo-title');
let todoItems = [];

const render = (container, items) => {
    container.innerHTML = showTodo(items);
    showCount(items.length)
}

//Todo 추가하기
function addTodo() {
    const todoName = document.getElementById("new-todo-title");
    if(todoName.value === '' || todoName.value === null) {
        alert('내용을 입력해주세요');
        return;
    }

    if(window.event.keyCode == 13){
        updateStorage(todoName.value,false);
        render(container, todoItems);
        todoName.value = "";
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
    const targetTodoName = event.target.previousSibling.previousSibling.innerText;
    const index = todoItems.findIndex((todo) =>todo.todoName === targetTodoName);
    container.removeChild(event.target.parentElement.parentElement);
    todoItems.splice(index,1);

    render(container, todoItems);
    localStorage.setItem('todoList',JSON.stringify(todoItems));
}

//스토리지 업데이트
function updateStorage(todoName, todoStatus){
    todoItems.push({todoName,todoStatus});
    localStorage.setItem('items',JSON.stringify(todoItems))
}

filterContainer.addEventListener('click', render(container, completeTodo(this)));
// filterContainer.addEventListener('click', render(container, showAllTodo()));
// filterContainer.addEventListener('click', render(container, noCompleteTodo()));

//Todo 상태변경 이벤트 핸들러
container.addEventListener('click', checkTodo);
//Todo 삭제 이벤트 핸들러
container.addEventListener('click', deleteTodo);
//Todo 추가 이벤트 핸들러
inputTodo.addEventListener('keyup', addTodo);
