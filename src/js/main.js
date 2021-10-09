const container = document.getElementById("todo-list");

function createTodo(todoName) {
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

//게시물 개수 수정
function updateCount(updateCount){
    const countContainer = document.getElementById('todo-count-text');
    const count = countContainer.innerText;
    countContainer.innerText = Number(count)+Number(updateCount);
}

//Todo 상태변경
function checkTodo(e) {
  const event = e || window.event;
  if(event.target.classList != 'toggle'){
      return;
  }
  const targetContainer = event.target.parentElement.parentElement
  targetContainer.classList.toggle('completed')
}

//Todo 삭제하기
function deleteTodo(e) {
    const event = e || window.event;
    if(event.target.classList != 'destroy'){
        return;
    }
    container.removeChild(event.target.parentElement.parentElement);
    updateCount(-1);
}

//Todo 상태변경 이벤트 핸들러
container.addEventListener('click', checkTodo);
//Todo 삭제 이벤트 핸들러
container.addEventListener('click', deleteTodo);

