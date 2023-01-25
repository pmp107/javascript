const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");

//function to maintain count of Task.
function updateMessage(){
    const textLength = tasks.children.length;
    messageSpan.textContent = `You have ${textLength} pending tasks.`;
}
updateMessage();

//To add new Task
addForm.addEventListener("submit", event => {
    event.preventDefault();
    const value = addForm.task.value.trim()

    if(value.length){
        tasks.innerHTML += `<li>
                                <span>${value}</span>
                                <i class="bi bi-trash-fill delete"></i>
                            </li>`;
        addForm.reset();
        updateMessage();
    }
});

//To delete Task
tasks.addEventListener("click", event => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        updateMessage();
    }
});

//To delete all Tasks
clearAll.addEventListener("click", event => {
    const taskItems = tasks.querySelectorAll("li");
    taskItems.forEach(item => {
        item.remove();
    });
    updateMessage();
});

//To search specific tasks
function filterTask(term){
    // console.log(term);
    //Will hide the tasks which don't match with user search string.
    Array.from(tasks.children)
    .filter(task => {
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach(task => {
        task.classList.add("hide");
    });
    //Will show the tasks which matches with user search string.
    Array.from(tasks.children)
    .filter(task => {
        return task.textContent.toLowerCase().includes(term);
    })
    .forEach(task => {
        // console.log(task);
        task.classList.remove("hide");
    });

}


searchForm.addEventListener("keyup", event => {
    const term = searchForm.task.value.trim().toLowerCase();
    filterTask(term);
});


searchForm.addEventListener("click", event => {
    if(event.target.classList.contains("reset")){
        searchForm.reset();
        const term = searchForm.task.value.trim();
        filterTask(term);
    }
})