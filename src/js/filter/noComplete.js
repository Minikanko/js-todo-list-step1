//Todo 해야할일 보기
export default function noCompleteTodo(e){
    const event = e || window.event;
    if(!event.target.classList.contains('active')) {
        return;
    }

    const todoList = JSON.parse(localStorage.getItem('todoList'));
    const noCompleteTodo = todoList.filter((todo) => todo.todoStatus === false);
    return noCompleteTodo;
}