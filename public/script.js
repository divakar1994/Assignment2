console.log("Is script file loading");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
//var TODOS_DATA_JSON= "todos_list_div"
var TODOS_COMPLETED_ID = "completed_todo_div"
var TODOS_ADD_ID = "add_todo_div"
var TODOS_ACTIVE_ID = "active_todo_div"
var TODOS_DELETED_ID = "deleted_todo_div"
// var TODOS_LIST_ID = "todos_list_div"
var NEW_TODO_INPUT_ID = "new_todo_input"
var active_parent = document.getElementById(TODOS_ACTIVE_ID);
var complete_parent = document.getElementById(TODOS_COMPLETED_ID);
var deleted_parent = document.getElementById(TODOS_DELETED_ID);


window.onload = getTodosAJAX();

function removeRepeatTodos() {
    if (active_parent.hasChildNodes()) {
        active_parent.removeChild(active_parent.lastChild)
    }
    if (complete_parent.hasChildNodes()) {
        complete_parent.removeChild(complete_parent.lastChild)
    }
    if (deleted_parent.hasChildNodes()) {
        deleted_parent.removeChild(deleted_parent.lastChild)
    }
}


function addTodoElement(todos_data_json) {
    var todos = JSON.parse(todos_data_json);
    // var active_parent = document.getElementById(TODOS_ACTIVE_ID);
    // var complete_parent = document.getElementById(TODOS_COMPLETED_ID);
    // var deleted_parent = document.getElementById(TODOS_DELETED_ID);

    active_parent.innerHTML = "";
    complete_parent.innerHTML = "";
    deleted_parent.innerHTML = "";
    Object.keys(todos).forEach(
        function (id) {
            var todo_element = createTodoElement(id, todos[id])
            if (todos[id].status === "ACTIVE") {
                active_parent.appendChild(todo_element);
            } else if (todos[id].status === "COMPLETE") {
                complete_parent.appendChild(todo_element);
            } else {
                deleted_parent.appendChild(todo_element);
            }
        }
    );
    //parent.appendChild(createTodoElement());
    //parent.innerText= todos_data_json;
}

function createTodoElement(id, todo_object) {
    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id", id);
    todo_element.setAttribute("class", "todoStatus" + todo_object.status);
    if(todo_object.status === "ACTIVE"){
        var complete_button = document.createElement("button");
        complete_button.innerText = "Marks as complete";
        complete_button.setAttribute("onclick", "completeTodoAJAX(" + id + ")");
        complete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(complete_button);
        var delete_button = document.createElement("button");
        delete_button.innerText = "Delete Todo";
        delete_button.setAttribute("onclick", "deleteTodoAJAX(" + id + ")");
        delete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(delete_button);

    }else if(todo_object.status === "COMPLETED"){
        // var complete_button = document.createElement("button");
        // complete_button.innerText = "Marks as complete";
        // complete_button.setAttribute("onclick", "completeTodoAJAX(" + id + ")");
        // complete_button.setAttribute("class", "breathHorizontal");
        // todo_element.appendChild(complete_button);
        var delete_button = document.createElement("button");
        delete_button.innerText = "Delete Todo";
        delete_button.setAttribute("onclick", "deleteTodoAJAX(" + id + ")");
        delete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(delete_button);

    }

    // if (todo_object.status === "ACTIVE") {
    //     active_parent.appendChild(todo_element);
    //     var complete_button = document.createElement("button");
    //     complete_button.innerText = "Marks as complete";
    //     complete_button.setAttribute("onclick", "completeTodoAJAX(" + id + ")");
    //     complete_button.setAttribute("class", "breathHorizontal");


        // var delete_button = document.createElement("button");
        // delete_button.innerText = "Delete Todo";
        // delete_button.setAttribute("onclick", "deleteTodoAJAX(" + id + ")");
        // delete_button.setAttribute("class", "breathHorizontal");
        // if(deleted_parent.hasChildNodes()){
        //     deleted_parent.removeChild(deleted_parent.lastChild)
        // }
    // }
    return todo_element;
}


function completeTodoAJAX(id) {
    // var completed_title = document.getElementById(TODOS_COMPLETED_ID).value;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=COMPLETE";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                // console.log(xhr.response);
                addTodoElement(xhr.responseText)

            }
            else {
                console.log(xhr.responseText);
            }

        }
    };
    xhr.send(data);
    // if(complete_parent.hasChildNodes()){
    //     complete_parent.removeChild(complete_parent.lastChild)
    // }
}


function addTodosAJAX() {
    var title = document.getElementById(NEW_TODO_INPUT_ID).value;
    // var body_data= "todo_title"
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos/", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "todo_title= " + encodeURI(title);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                // console.log(xhr.response);
                addTodoElement(xhr.responseText)

            }
            else {
                console.log(xhr.responseText);
            }

        }
    };

    xhr.send(data);
    //;
}


function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                console.log(xhr.response);
                addTodoElement(xhr.responseText)
            }

        }
    };
    xhr.send(data = null);
}

function deleteTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=DELETED";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                // console.log(xhr.response);
                addTodoElement(xhr.responseText)

            }
            else {
                console.log(xhr.responseText);
            }

        }
    }
    xhr.send(data);
    //removeRepeatTodos()
}