const todoForm = document.getElementById("todo-form") // todoForm 라는 상수에 "todo-form" 라는 Id를 가진 태그를 가져옴.
const todoInput = document.querySelector("#todo-form input")
const todoList = document.getElementById("todo-list") // todoList 라는 상수에 "todo-list" 라는 Id를 가진 태그를 가져옴. 
const todoItem = document.createElement("li") // todoItem 이라는 상수에 "li" 태그를 정의해줌.

function deleteTodo(event) { // Todolist 내의 요소를 삭제하는 함수
    const li = event.target.parentElement // li라는 상수에 우리가 클릭하여 누른 버튼을 상속한 태그를 가져옴.
    li.remove() // 그 li를 삭제함.
}
function paintTodo(newTodo) { // Todolist에 항목을 추가하는 함수
    const li = document.createElement('li') // li 태그를 'li'라는 상수에 저장
    const span = document.createElement('span') // span 태그를 'span' 라는 상수에 저장
    span.innerText = newTodo // 매개 변수로 받아온 'newTodo'값 (내가 적은 값)을 span 상수의 안쪽 텍스트에 저장
    const button = document.createElement('button') // button 태그를 'button' 라는 상수에 저장
    button.innerText = '❌' // 버튼 내의 텍스트를 '❌'라는 특수문자로 지정
    button.addEventListener('click', deleteTodo) // 버튼 클릭 이벤트를 받으면 deleteTodo라는 함수를 실행함
    li.appendChild(span) // li에 span을 상속시킴
    li.appendChild(button) // li에 button을 상속시킴
    todoList.appendChild(li) // todoList에 li를 상속시킴. 'todoList'는 "todo-list" 라는 Id를 가진 전역 상수
}
function handleTodoSubmit(event){
    event.preventDefault() // 버튼을 눌렀을 때의 새로고침을 막음
    const newTodo = todoInput.value // newTodo 라는 상수에 todoInput의 값을 저장함.
    todoInput.value = '' // todoInput의 값을 초기화시켜줌.
    paintTodo(newTodo) // newTodo의 값을 paintTodo에 넣어 Todolist에 보이게 함.
}
todoForm.addEventListener("submit", handleTodoSubmit) // submit 이벤트를 받았을 때 handleTodoSubmit 함수를 실행시킴
