const todoForm = document.getElementById("todo-form") // todoForm 라는 상수에 "todo-form" 라는 Id를 가진 태그를 가져옴.
const todoInput = document.querySelector("#todo-form input")
const todoList = document.getElementById("todo-list") // todoList 라는 상수에 "todo-list" 라는 Id를 가진 태그를 가져옴. 

const todos_key = 'todos' // localStorage 에 저장할 키를 지정해줌
let todos = [] // 할 일들을 저장하는 배열

function saveTodo() { // localStorage 에 항목들을 저장하는 함수
    localStorage.setItem('todos', JSON.stringify(todos)) // localStorage 에 todos의 정보들을 저장함.
    // JSON.stringify(todos) 를 사용하여 배열의 모양으로 저장함.
}
function deleteTodo(event) { // Todolist 내의 요소를 삭제하는 함수
    const li = event.target.parentElement // li라는 상수에 우리가 클릭하여 누른 버튼을 상속한 태그를 가져옴.
    li.remove() // 그 li를 삭제함.
    todos = todos.filter((todo) => todo.id !== parseInt(li.id)) // string 형이던 li의 id 인자를 int 로 바꾼 뒤 todos의 매 인자들의 id와 비교하여 삭제하려는 id와 같은 것은 제외함.
    saveTodo() // 삭제하고싶은 원소를 제외한 뒤 localStorage 에 저장함
}
function paintTodo(newTodo) { // Todolist에 항목을 추가하는 함수
    const li = document.createElement('li') // li 태그를 'li'라는 상수에 저장
    li.id = newTodo.id // li 태그에 해당 인자가 가진 id를 저장시켜줌.
    const span = document.createElement('span') // span 태그를 'span' 라는 상수에 저장
    span.innerText = newTodo.text // 매개 변수로 받아온 'newTodo'값 (내가 적은 값)의 text 부분을 span 상수의 안쪽 텍스트에 저장
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
    const newTodoObject = { // 입력받은 값 (newTodo) 에 id를 넣어주기 위해 객체로 만들어 다시 정의함
        text: newTodo, //  text 값에는 newTodo 값을 넣어줌
        id: Date.now() // id 값에는 Date.now()를 해주어 모든 값마다 다 다른 값이 들어감. ( 그러므로 값은 고유하여 id로 사용할 수 있음. )
    }
    todos.push(newTodoObject) // newTodo의 값을 todos 에 저장시킴.
    paintTodo(newTodoObject) // newTodo의 값을 paintTodo에 넣어 Todolist에 보이게 함.
    saveTodo() // saveTodo 함수 실행 ( todos 를 localStorage 에 집어넣음. )
}
todoForm.addEventListener("submit", handleTodoSubmit) // submit 이벤트를 받았을 때 handleTodoSubmit 함수를 실행시킴
const saveTodos = localStorage.getItem(todos_key) // localStorage 에서 항목들을 가져옴.
if (saveTodos != null) { // 만약 localStorage 가 null 이 아니라면 ( 비어있지 않다면 ) )
    const parsedTodos = JSON.parse(saveTodos) // parse를 해주어서 '[a,b,c,d,e,f]' 의 텍스트 형태를 ['a', 'b', 'c', 'd', 'e', 'f'] 의 배열 형태로 바꿔줌.
    todos = parsedTodos // todos 배열에 다시 집어넣음.
    parsedTodos.forEach(paintTodo) // 모든 배열 인자에 대해서 paintTodo 함수를 적용시켜줌.
}