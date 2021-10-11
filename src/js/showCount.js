
//게시물 개수 
export default function showCount(count){
    const countContainer = document.getElementById('todo-count-text');
    if(typeof count !== 'number'){
        console.log('숫자만 가능합니다.');
        return;
    }
    
    countContainer.innerText = count;
}