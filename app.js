//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.
console.log('Здравствуйте!\n\nелси Вас не затруднит, проверьте пожалуйста и оставьте свои данные для связи в случае проблем/вопросов\n\nпо своей глупости натворил делов на гитхабе, из-за чего сейчас переделываю задание\n\nодна из причин, не та ссылка была засабмичена, оставляю на PR здесь https://github.com/Antonowka/clean-code-s1e1/pull/5\n\nСпасибо большое за понимание!')
if (
  window.confirm('Здравствуйте!\nЕсли Вы нажмете <ok> то перейдете на мою страницу github с pull request.\nПри клике на <отмена> сможете проверить работоспособность приложения. В консоле продублирую ссылку на pull request.\n\nИзвиняюсь за неудобство\n\nПо своей глупости натворил делов на гитхабе, из-за чего переделывал задание и в спешке засабмитил не ту ссылку.')) {
  window.location.href = 'https://github.com/Antonowka/clean-code-s1e1/pull/5';
};
var taskInput = document.getElementById("new__task"); //Add a new task.
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTaskHolder = document.getElementById("incomplete__tasks"); //ul of #incompleteTasks
var completedTasksHolder = document.getElementById("completed__tasks"); //completed-tasks


//New task list item
var createNewTaskElement = function (taskString) {

  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); //checkbx
  //label
  var label = document.createElement("label"); //label
  //input (text)
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button"); //edit button

  //button.delete
  var deleteButton = document.createElement("button"); //delete button
  var deleteButtonImg = document.createElement("img"); //delete button image

  listItem.classList = 'task__items-wrapper';

  label.innerText = taskString;
  label.className = 'task__item task__label';

  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "task__checked";
  editInput.className = "task__item task__input";
  editInput.type = "text";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "button button-edit";

  deleteButton.className = "button button-delete";
  deleteButtonImg.src = './assets/remove.svg';
  deleteButtonImg.className = 'button-img';
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.

var editTask = function () {
  var listItem = this.parentNode;

  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".button-edit");
  var containsClass = listItem.classList.contains("edit__mode");
  //If class of the parent is .edit__mode
  if (containsClass) {

    //switch to .edit__mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .edit__mode on the parent.
  listItem.classList.toggle("edit__mode");
};

//Delete task.
var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}

//Mark task completed
var taskCompleted = function () {
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function () {

}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {

  //select ListItems children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.button-edit");
  var deleteButton = taskListItem.querySelector("button.button-delete");


  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.