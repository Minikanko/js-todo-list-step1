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

//일정 추가하기
function addTodo() {
    if (window.event.keyCode == 13) {
        let title = document.getElementById("new-todo-title");
        createTodo(title.value);
        document.getElementById("new-todo-title").value = "";
    }
}

//일정 상태변경
function changeStatus(e) {
  let event = e || window.event;
  let li = event.target.parentElement.parentElement;
  li.classList.toggle('completed')
}
//일정 삭제하기
function deleteTodo(e) {
    let event = e || window.event;
    ul.removeChild(event.target.parentElement.parentElement);
}
//일정수 계산하기
function calTodoCount() {
    document.getElementById("todo-count-text").innerText =  ul.childElementCount;

}
//일정 상태별 확인
function filterTodoByStatus() {
  
}

ul.addEventListener("change", calTodoCount());
