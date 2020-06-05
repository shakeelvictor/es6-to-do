// Storage key to add tasks to localStorage
const storageKey = "tutorial_todos";

// Utility function for getting todos from localStorage
const convertStringToArray = (str) => JSON.parse(str) || [];

// Utility function for setting todos to localStorage
const convertArrayToString = (arr) => JSON.stringify(arr) || "";

// Get todos from localStorage key
const getToDos = () => convertStringToArray(localStorage.getItem(storageKey));

// Add todo and set todo to localStorage with rest of array
const addToDo = (todo) =>
  localStorage.setItem(storageKey, convertArrayToString([...getToDos(), todo]));

// Delete todo from localStorage
const deleteToDo = (todo) =>
  localStorage.setItem(
    storageKey,
    convertArrayToString(getToDos().filter((_todo) => _todo !== todo))
  );

// Build todo element
const buildToDoElement = (todo) => {
  const element = document.createElement("li");
  element.classList.add("list-group-item");
  element.innerText = todo;
  return element;
};

// Append todo element to display in the DOM
const appendLiToDOM = (element) =>
  document.getElementById("todo-list-container").appendChild(element);

// Refresh todo list every time it updates
const refreshToDoList = () => {
  document.getElementById("todo-list-container").innerHTML = "";
};

// Clear input after todo is set to localStorage and when it displays in the DOM
const clearInput = () => (document.getElementById("new-todo-input").value = "");

// Show todo list
const displayToDos = () => {
  clearInput();
  refreshToDoList();
  getToDos().forEach((todo) => appendLiToDOM(buildToDoElement(todo)));
  initClickListeners();
};

// Initialize event listeners
const initClickListeners = () => {
  // Sets list items to array in order to leverage array methods
  // This listener will fire when list item is clicked and
  // will delete item from list after user confirmation
  Array.from(document.getElementsByClassName("list-group-item")).forEach(
    (item) => {
      item.addEventListener("click", (e) => {
        const todo = e.target.innerText;
        if (window.confirm(`Have you completed this task? : ${todo}`)) {
          deleteToDo(todo);
          displayToDos();
        }
      });
    }
  );
};

// Display current todos when DOM loads
document.addEventListener("DOMContentLoaded", () => displayToDos());

// Get input value of todo and when submitted, display in the DOM
document
  .getElementById("submit-new-todo-btn")
  .addEventListener("click", (e) => {
    const newToDoInput = document.getElementById("new-todo-input");
    if (newToDoInput.value) {
      addToDo(newToDoInput.value.trim());
      displayToDos();
    }
  });

// Utility function to manually reset localStorage
document.getElementById("reset-storage-btn").addEventListener("click", (e) => {
  localStorage.removeItem(storageKey);
  displayToDos();
});
