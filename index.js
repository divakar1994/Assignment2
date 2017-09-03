var express = require("express");
var bodyParser= require("body-parser");
var todos_db= require("./seed.js");

var app= express();

app.use("/", bodyParser.urlencoded({extended:false}));
app.use("/", express.static(__dirname+"/public"));



app.get("/api/todos/active/", function(req,res){
    var todo_status= req.body.todo_status;
    var obj={};
    for(var i in todos_db.todos) {
        if (todos_db.todos[i].status == todos_db.StatusENUMS.ACTIVE) {
            obj[i] = todos_db.todos[i];
        }
    }
    res.json(obj);

})

app.get("/api/todos/complete/", function(req,res){
    var todo_status= req.body.todo_status;
    var obj={};
    for(var i in todos_db.todos) {
        if (todos_db.todos[i].status == todos_db.StatusENUMS.COMPLETE) {
            obj[i] = todos_db.todos[i];
        }
    }
    res.json(obj);

})
app.get("/api/todos/deleted/", function(req,res){
    var todo_status= req.body.todo_status;
    var obj={};
    for(var i in todos_db.todos) {
        if (todos_db.todos[i].status == todos_db.StatusENUMS.DELETED) {
            obj[i] = todos_db.todos[i];
        }
    }
    res.json(obj);

})








app.put("/api/todos/active/:id", function(req,res){
    var id= req.params.id;
    var todo = todos_db.todos[id].status=todos_db.StatusENUMS.ACTIVE;
    res.json(todos_db.todos);

})

app.put("/api/todos/complete/:id", function(req,res){
    var id= req.params.id;
    var todo = todos_db.todos[id].status=todos_db.todos.StatusENUMS.COMPLETE;
    res.json(todos_db.todos);

})







app.get("/api/todos", function(req,res){
    res.json(todos_db.todos);
});

app.delete("/api/todos/:id", function(req,res){
    var del_id= req.params.id;
    var todo= todos_db.todos[del_id];
    //if todo doesnt exist then send apppropriate response

    if(!todo)
    {
        res.status(400).json({
            error: "todo doesnt exist"
        });
    }
    else{
        todo.status= todos_db.StatusENUMS.DELETED;
        res.json(todos_db.todos);
    }
});

app.post("/api/todos/", function(req,res){
    var todo= req.body.todo_title;
    if(!todo||todo==""||todo.trim()==""){
        res.status(400).json({error: "Todo title cant be empty"});
    }
    else{
        var new_todo_object={
            title: req.body.todo_title,
            status: todos_db.StatusENUMS.ACTIVE
        };
        todos_db.todos[todos_db.next_todo_id++] = new_todo_object;
        //todos_db.next_todos_id
        res.json(todos_db.todos);
    }

});
app.put("/api/todos/:id", function(req,res){
    var todo= todos_db.todos[req.params.id];
    var todo_title= req.body.todo_title;

    if(todo_title && todo_title!="" && todo_title.trim()!=""){
        todo.title = todo_title;
    }

    var todo_status = req.body.todo_status;
    if(todo_status && (todo_status=== todos_db.StatusENUMS.ACTIVE||
            todo_status=== todos_db.StatusENUMS.COMPLETE ||
            todo_status=== todos_db.StatusENUMS.DELETED))
        todo.status= todo_status;

    res.json(todos_db.todos)

});
app.listen(4000,console.log("Listening to 4000"));