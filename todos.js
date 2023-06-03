let addButtonElement = document.getElementById("addButton");
let saveTodoButton = document.getElementById("saveButton");
var todoTopicContainerElement = document.getElementById("todoTopicContainer");



function getListFromLocalStorage() {
    let stringifiedList = localStorage.getItem("todoList");
    let parsedList = JSON.parse(stringifiedList);

    // console.log(typeof parsedList); // null(object)

    // const emptyString = "";
    // console.log(emptyString === null); // false

    // const nullObj = null;
    // console.log(nullObj === null); // true

    if (parsedList === null) {
        return [];
    } else {
        return parsedList;
    }
}

let todoList = getListFromLocalStorage();
var addedCounter = 1;


function myFunction(checkboxElement, todoSpanElement) {
    if (checkboxElement.checked) {
        todoSpanElement.style.textDecoration = "line-through";
    } else {
        todoSpanElement.style.textDecoration = "none";
    }
}

function deleteFunction(addedTodoContainer, inputElementValue) {
    addedTodoContainer.remove();
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    let index = todoList.indexOf(inputElementValue);
    todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

var inputElement = document.getElementById("userInput");



// rendering -creatingElement
const renderTodo = (inputElementValue) => {

    // main-container
    var addedTodoContainer = document.createElement("div");
    addedTodoContainer.className = "added-todo-container";
    addedTodoContainer.id = "addedTodoContainer" + addedCounter;
    todoTopicContainerElement.appendChild(addedTodoContainer);


    //sub-main-container1
    let checkboxContainer = document.createElement("div");
    addedTodoContainer.appendChild(checkboxContainer);

    //sub-main-checkbox-element-container
    let checkboxElement = document.createElement("input");
    checkboxElement.setAttribute("type", "checkbox");
    checkboxElement.className = "checkbox";
    checkboxElement.id = "checkbox" + addedCounter;
    checkboxContainer.appendChild(checkboxElement);


    //sub-main-container2
    var todosSpanImgContainer = document.createElement("div");
    todosSpanImgContainer.className = " todo-topic-span-icon-container";
    addedTodoContainer.appendChild(todosSpanImgContainer);


    //sub-main-span-element-container
    let todoSpanElement = document.createElement('span');
    todoSpanElement.className = "todo-span-class";
    todoSpanElement.id = "todoSpan" + addedCounter;

    todoSpanElement.textContent = inputElementValue;
    todosSpanImgContainer.appendChild(todoSpanElement);

    //sub-main-icon-element-container
    let imageElement = document.createElement('img');
    imageElement.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/3405/3405244.png");
    imageElement.className = "delete-icon-img";
    imageElement.id = "deleteIconImg" + addedCounter;
    todosSpanImgContainer.appendChild(imageElement);


    //Adding functionality to elements
    checkboxElement.addEventListener("change", function() {
        myFunction(checkboxElement, todoSpanElement);
    });

    imageElement.addEventListener("click", function() {
        deleteFunction(addedTodoContainer, inputElementValue);
    });

    addedCounter += 1;

};


addButtonElement.onclick = function() {
    var inputElementValue = inputElement.value;
    if (inputElementValue === "") {
        alert("Enter a Valid Text");
        return;
    } else {
        renderTodo(inputElementValue);
        todoList.push(inputElementValue);
        inputElement.value = "";
    }
};

saveTodoButton.onclick = function() {
    console.log(todoList);
    localStorage.setItem("todoList", JSON.stringify(todoList));
};


const renderAllTodos = () => {
    todoList.forEach((ele) => {
        renderTodo(ele);
    });
};

renderAllTodos();