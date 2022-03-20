let input=document.getElementsByClassName("input")[0];
let addTask=document.getElementsByClassName("add")[0];
let tasksDiv=document.getElementsByClassName("tasks")[0];
let taskDiv=document.querySelectorAll(".tasks .task");
let clearAll=document.querySelector(".container .clear");
let taskStateDiv=document.querySelector(".container .tasks-state");
let arrayOfTasks;
getDataFromLocalStorage();
window.onload=function(){
    input.focus();
}
addTask.onclick=function(){
    if(input.value!=""){
        let flagExist=false;
        arrayOfTasks.forEach(task => {
            if(input.value==task.text){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
                flagExist=true;
            }
        });
        if(flagExist==false){
            addTaskToArray(input.value);
            addElementsToPage(arrayOfTasks);
            addDataToLocalStorage(arrayOfTasks);
        }
        input.value="";
        input.focus();
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        });
    }
};
tasksDiv.addEventListener("click",function(e){
    // Delete Button
    if(e.target.classList.contains("delete")){
        deleteTaskFromLocalStorage(e);
        e.target.parentElement.remove();
        if(arrayOfTasks.length==0){
            noTasksToShow();
        }
        else{
            addElementsToPage(arrayOfTasks);
        }
    }
    // Update 
    if(e.target.classList.contains("task")){
        changeStatusTask(e);
        addElementsToPage(arrayOfTasks);
    }
});
clearAll.onclick=function(){
    if(arrayOfTasks.length!=0){
        clearAllLocalStorage();
    }};

function getDataFromLocalStorage(){
    if(localStorage.getItem("tasks")){
        arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
        addElementsToPage(arrayOfTasks);
    }
    else{
        noTasksToShow();    
    }
    if(arrayOfTasks.length==0){
        noTasksToShow();
    }
}
function getStateFromData(){
    let completedTask=0;
    for(let i=0;i<arrayOfTasks.length;i++){
        if(arrayOfTasks[i].completed==true){
            completedTask++;
        }
    }
    return completedTask;
}
function noTasksToShow(){
    tasksDiv.innerHTML="";
    taskStateDiv.innerHTML="";
    arrayOfTasks=[];
    createElement(tasksDiv,"span","no-tasks","No Tasks to Show",null,null);
    clearAll.style.opacity=0.2;
}
function createElement(parent,element,className,text,attribute,value){
    let elementTag=document.createElement(element);
    elementTag.className=className;
    elementTag.setAttribute(attribute,value);
    let textNode=document.createTextNode(text);
    elementTag.appendChild(textNode);
    parent.appendChild(elementTag);
    return elementTag;
}
function addTaskToArray(taskText){
    let task={
        id: Date.now(),
        text:taskText,
        completed:false
    };
    arrayOfTasks.push(task);
}
function addElementsToPage(data){
    tasksDiv.innerHTML="";
    taskStateDiv.innerHTML="";
    data.forEach((task)=>{
        // create main div
        let taskDiv =createElement(tasksDiv,"div","task",task.text,"data-id",task.id);
        if(task.completed){
            taskDiv.className="task done";
        }
        // create delete button 
        createElement(taskDiv,"span","delete","DELETE",null,null);
    });
//create Tasks State
    //create tasks count
    let tasksCount=createElement(taskStateDiv,"div","tasks-count","Tasks",null,null);
    createElement(tasksCount,"span","",data.length,null,null);

    //create tasks completed
    let completedTasks=getStateFromData();
    let tasksCompleted=createElement(taskStateDiv,"div","tasks-completed","Completed",null,null);
    createElement(tasksCompleted,"span","",completedTasks,null,null);

    clearAll.style.opacity=1;
}
function addDataToLocalStorage(data){
    localStorage.setItem("tasks",JSON.stringify(data));
}
function deleteTaskFromLocalStorage(e){
    arrayOfTasks=arrayOfTasks.filter(t=>t.id!=e.target.parentElement.getAttribute('data-id'));
    addDataToLocalStorage(arrayOfTasks);
}
function changeStatusTask(e){
    arrayOfTasks.forEach(task => {
        if(e.target.getAttribute('data-id')==task.id){
            if(task.completed==false){
                task.completed=true;
                e.target.classList.add("done");
            }
        }
    });
    addDataToLocalStorage(arrayOfTasks);
}
function clearAllLocalStorage(){
    localStorage.removeItem("tasks");
    noTasksToShow();
}