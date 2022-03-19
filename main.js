let input=document.getElementsByClassName("input")[0];
let addTask=document.getElementsByClassName("add")[0];
let tasksDiv=document.getElementsByClassName("tasks")[0];
let taskDiv=document.querySelectorAll(".tasks .task");
let clearAll=document.querySelector(".container .clear");
let taskStateDiv=document.querySelector(".container .tasks-state");
let arrayOfTasks;
getDataFromLocalStorage();
addTask.onclick=function(){
    if(input.value!=""){
        addTaskToArray(input.value);
        input.value="";
        addElementsToPage(arrayOfTasks);
        addDataToLocalStorage(arrayOfTasks);
    }
};
tasksDiv.addEventListener("click",function(e){
    // Delete Button
    if(e.target.classList.contains("delete")){
        deleteTaskFromLocalStorage(e);
        e.target.parentElement.remove();
    }
    // Update 
    if(e.target.classList.contains("task")){
        changeStatusTask(e);
    }
    addElementsToPage(arrayOfTasks);
});
clearAll.onclick=clearAllLocalStorage;

function getDataFromLocalStorage(){
    if(localStorage.getItem("tasks")){
        arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
        addElementsToPage(arrayOfTasks);
    }
    else{
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
    let noTasks=document.createElement("span");
    noTasks.className="no-tasks";
    let noTasksText=document.createTextNode("No Tasks to Show");
    noTasks.appendChild(noTasksText);
    tasksDiv.appendChild(noTasks);
    clearAll.style.opacity=0.2;
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
        let taskDiv=document.createElement("div");
        taskDiv.setAttribute("data-id",task.id);
        let taskText=document.createTextNode(task.text);
        taskDiv.appendChild(taskText);
        taskDiv.className="task";
        if(task.completed){
            taskDiv.className="task done";
        }
        // create delete button 
        let deleteSpan=document.createElement("span");
        deleteSpan.appendChild(document.createTextNode("Delete"));
        deleteSpan.className="delete";
        // append all div to page
        taskDiv.appendChild(deleteSpan);
        tasksDiv.appendChild(taskDiv);

    });
//create Tasks State
    //create tasks count
    let tasksCount=document.createElement("div");
    tasksCount.className="tasks-count";
    let tasksCountText=document.createTextNode("Tasks");
    tasksCount.appendChild(tasksCountText);
    let countSpan=document.createElement("span");
    let countSpanText=document.createTextNode(data.length);
    countSpan.appendChild(countSpanText);
    tasksCount.appendChild(countSpan);
    taskStateDiv.appendChild(tasksCount);
    //create tasks completed
    let tasksCompleted=document.createElement("div");
    tasksCompleted.className="tasks-completed";
    let tasksCompletedText=document.createTextNode("Completed");
    tasksCompleted.appendChild(tasksCompletedText);
    let completedSpan=document.createElement("span");
    let completedTasks=getStateFromData();
    let completedSpanText=document.createTextNode(completedTasks);
    completedSpan.appendChild(completedSpanText);
    tasksCompleted.appendChild(completedSpan);
    taskStateDiv.appendChild(tasksCompleted);
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