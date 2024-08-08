// Grabbing all the required elements from HTML
const listContainer = document.querySelector(".list-container"),
inputBox = document.querySelector(".inputbox"),
cancelBtn = document.querySelector(".cancel-btn"),
addBtn = document.querySelector(".add-btn"),
clearallBtn = document.querySelector(".clearall-btn"),
errorMessage = document.querySelector(".error-message"),
totaltaskEl = document.querySelector(".total"),
pendingtaskEl = document.querySelector(".pending")

// Required to edit the element
let editElement;
let isEditing = false;

let total=0;
let pending=0;

// Get items from local storage
listContainer.innerHTML = localStorage.getItem("items")

if(localStorage.getItem("total")!=null){
    total = localStorage.getItem("total")
    pending = localStorage.getItem("pending")
}else{
    total=0;
    pending = 0;
}
taskDetails();
addTask();


// Event Listener
addBtn.onclick = function(){
    if(inputBox.value){
        addTask();
        clearallBtn.style.display = "inline"
    }else{
        displayMessage("Please Enter Your task First","warning")
    }
    saveItems();
}


// Function
function addTask(){
    if(inputBox.value && isEditing === false){
        let list = 
        `<article class="list">
        <p class="items">${inputBox.value}</p>
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-trash"></i>
    </article>`
        
    listContainer.innerHTML+=list
    displayMessage("Task Added Succesfully","success");
    inputBox.value = '';
    total++;
    pending++;
    taskDetails();


    }else if(inputBox.value && isEditing ===true){
        editElement.innerText = inputBox.value
        displayMessage("Task Edited Succesfully","success");
        addBtn.innerText = 'Add'
        isEditing = false;
        inputBox.value = ''
    }

    // Selecting created elements
    let listItems = listContainer.querySelectorAll(".items")
    let editBtn = listContainer.querySelectorAll(".fa-pen-to-square")
    let deleteBtn = listContainer.querySelectorAll(".fa-trash")

    // Check/Uncheck the task
    listItems.forEach((item)=>
    item.onclick = function(){
        item.classList.toggle("checked")
        // For Task details
        if(item.classList.contains("checked")){
            pending--;
        }else{
            pending++;
        }
        taskDetails();
        saveItems();
    })

    // Delete the task
    deleteBtn.forEach((btn)=>
    btn.onclick = function(){
        btn.parentElement.remove();
        displayMessage("Task Deleted","inform")

        // Updating Task details
        if(btn.parentElement.firstElementChild.classList.contains("checked")){
            total--;
        }else{
            total--;
            pending--;
        }
        taskDetails();
        saveItems();
    })


// Edit the task
    editBtn.forEach((btn)=>
    btn.onclick =function(){
        isEditing = true;
        editElement = btn.previousElementSibling;
        inputBox.value = editElement.innerText;
        addBtn.innerText = 'Save'
    })

// Add task function finishes here......
}


// Clear All Btn
clearallBtn.onclick =function(){
    listContainer.innerHTML = '';
    displayMessage("All Task Deleted","inform")
    clearallBtn.style.display = "none"
    total=0
    pending=0
    taskDetails();
    saveItems();
}

// Cancel Btn
inputBox.onfocus = function(){
    cancelBtn.style.display = "inline"

    cancelBtn.onclick = function(){
        inputBox.value = '';
        cancelBtn.style.display = "none"
    }
}


// Error Message
    function displayMessage(message,type){
        errorMessage.style.top = "1%"
        errorMessage.innerText = `${message} !!`
        errorMessage.classList.remove('inform','success','warning')
        errorMessage.classList.add(`${type}`)

        // Hide message after certain time
        setTimeout(()=>{
            errorMessage.style.top = "-100%"
        },2000)
    }


function taskDetails(){
    totaltaskEl.innerText = `Total Task: ${total}`
    pendingtaskEl.innerText = `Pending Task: ${pending}`
}

// Save Items to Local Storage
function saveItems(){
    localStorage.setItem("items",listContainer.innerHTML);
    localStorage.setItem("total",total)
    localStorage.setItem("pending",pending)
}