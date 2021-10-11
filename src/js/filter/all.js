//Todo 전체보기
export default function showAllTodo(e){
    const event = e || window.event;
    if(!event.target.classList.contains('all')){
        return;
    }
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    return todoList;
}