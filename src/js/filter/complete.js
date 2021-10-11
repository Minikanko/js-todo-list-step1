

//Todo 완료한일 보기
export default function completeTodo(event){
    // event.preventDefault();
    
    if(!event.target.classList.contains('completed')){
        return;
    }
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    const completeTodo = todoList.filter((todo) => todo.todoStatus === true);
   
    return completeTodo;
}