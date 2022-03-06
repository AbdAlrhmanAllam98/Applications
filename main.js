let input=document.getElementsByClassName("input")[0];
let addTask=document.getElementsByClassName("add")[0];
let tasksDiv=document.getElementsByClassName("tasks")[0];
let taskDiv=document.querySelectorAll(".tasks .task");
let deleteButton=document.querySelector("tasks task span");
let clearAll=document.querySelector(".container .clear");
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
        toggleStatusTask(e);
        e.target.classList.toggle("done");
    }
});
clearAll.onclick=clearAllLocalStorage;

function getDataFromLocalStorage(){
    if(localStorage.getItem("tasks")){
        arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
        addElementsToPage(arrayOfTasks);
    }
    else{
        arrayOfTasks=[];
    }
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

}
function addDataToLocalStorage(data){
    localStorage.setItem("tasks",JSON.stringify(data));
}
function deleteTaskFromLocalStorage(e){
    arrayOfTasks=arrayOfTasks.filter(t=>t.id!=e.target.parentElement.getAttribute('data-id'));
    addDataToLocalStorage(arrayOfTasks);
}
function toggleStatusTask(e){
    arrayOfTasks.forEach(task => {
        if(e.target.getAttribute('data-id')==task.id){
            task.completed==false?task.completed=true:task.completed=false;
        }
    });
    addDataToLocalStorage(arrayOfTasks);
}
function clearAllLocalStorage(){
    localStorage.removeItem("tasks");
    tasksDiv.innerHTML="";
}