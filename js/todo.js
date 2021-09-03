const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;  // 식제하고싶은 li
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));  // toDo는 toDos DB에 있는 요소 중 하나
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");    // li 생성
    li.id = newTodo.id;
    const span = document.createElement("span");    // span 생성
    span.innerText = newTodo.text;   // span의 text 변경
    const button = document.createElement("button");    // button 생성
    button.innerText = "❌";    // button의 text 변경
    button.addEventListener("click", deleteToDo);   // button 이 클릭되었을 때
    li.appendChild(span);   // span을 li에 추가
    li.appendChild(button); // botton을 li에 추가
    toDoList.appendChild(li);   // li를 toDoList에 추가
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;    // input value값 저장 후에 비우기
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}
toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo); // paintToDo를 parsedToDos 배열의 요소마다 실행
}
