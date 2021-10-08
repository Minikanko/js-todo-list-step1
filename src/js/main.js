const ul = document.getElementById("todo-list");

function createTodo(todoName) {
    const container = document.querySelector('.todo-list');
    const currentTodo = container.innerHTML;
    container.innerHTML =  currentTodo+ 
    `
        <li>
            <div class="view">
                <input class="toggle" type="checkbox"/>
                <label class="label">${todoName}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todoName}" />
        </li>
    `;
}

//Todo 추가하기
function addTodo() {
    const todoName = document.getElementById("new-todo-title");
    if(todoName.value === '' || todoName.value === null)
        return;

    if(window.event.keyCode == 13){
        createTodo(todoName.value);
        document.getElementById("new-todo-title").value = "";
        updateCount(+1);
    }
}
//Todo 추가 이벤트 핸들러
const inputTodo = document.getElementById('new-todo-title');
inputTodo.addEventListener('keyup', addTodo);


function updateCount(updateCount){
    const countContainer = document.getElementById('todo-count-text');
    const count = countContainer.innerText;
    countContainer.innerText = Number(count)+Number(updateCount);
}

//Todo 상태변경
function checkTodo(e) {
  const event = e || window.event;
  const targetContainer = e.target.parentElement.parentElement
  targetContainer.classList.toggle('completed')
}

//Todo 상태변경 이벤트 핸들러
const targetTodo = document.querySelector('.todo-list');
targetTodo.addEventListener('click', checkTodo);

//Todo 삭제하기
function deleteTodo(e) {
    let event = e || window.event;
    ul.removeChild(event.target.parentElement.parentElement);
}
//Todo수 계산하기
function calTodoCount() {
    document.getElementById("todo-count-text").innerText =  ul.childElementCount;

}
//Todo 상태별 확인
function filterTodoByStatus() {
  
}

ul.addEventListener("change", calTodoCount());
