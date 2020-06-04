const storageKey = "tutorial_todos";

const convertStringToObj = (str) => JSON.parse(str) || [];

const convertObjToString = (obj) => JSON.stringify(obj) || "";

const getToDos = () => convertStringToObj(localStorage.getItem(storageKey));

const addToDo = (todo) =>
  localStorage.setItem(storageKey, convertObjToString([...getToDos(), todo]));

const deleteToDo = (todo) =>
  localStorage.setItem(
    storageKey,
    convertObjToString(getToDos().filter((_todo) => _todo !== todo))
  );

const buildToDoElement = (todo) => {
  const element = document.createElement("li");
  element.classList.add("list-group-item");
  element.innerText = todo;
  return element;
};

const appendLiToDOM = (element) =>
  document.getElementById("todo-list-container").appendChild(element);

const clearToDoList = () =>
  (document.getElementById("todo-list-container").innerHTML = "");

const clearInput = () => (document.getElementById("new-todo-input").value = "");

const displayToDos = () => {
  clearInput();
  clearToDoList();
  getToDos().forEach((todo) => appendLiToDOM(buildToDoElement(todo)));
  initClickListeners();
};

const initClickListeners = () => {
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

document.addEventListener("DOMContentLoaded", () => displayToDos());

document
  .getElementById("submit-new-todo-btn")
  .addEventListener("click", (e) => {
    const newToDoInput = document.getElementById("new-todo-input");
    if (newToDoInput.value) {
      addToDo(newToDoInput.value.trim());
      displayToDos();
    }
  });

document.getElementById("reset-storage-btn").addEventListener("click", (e) => {
  localStorage.removeItem(storageKey);
  displayToDos();
});
