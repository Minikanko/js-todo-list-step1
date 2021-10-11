const showTodo = (items) => {
    let comulationTodo = '';
    
    items.forEach((item) => {
        comulationTodo = comulationTodo + 
        `<li class = ${item?.todoStatus === true? 'completed' : ''}>
            <div class="view">
                <input class="toggle" type="checkbox" ${item?.todoStatus === true? 'checked' : ''}/>
                <label class="label">${item?.todoName}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${item?.todoName}" />
        </li>
        `;
    });
    return comulationTodo;
}

export default showTodo;
    