const todosList = [];
const addTodoButton = document.getElementById("add_todo");

const taskInput = document.getElementById("text");
taskInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    const input = document.querySelector("input");
    const listItem = document.createElement("li");
    listItem.innerText = input.value;
    todosList.push(input.value);
    input.value = "";
    const ul = document.querySelector("#todos");
    ul.appendChild(listItem);
  }
});

addTodoButton.addEventListener("click", () => {
  const input = document.querySelector("input");
  const listItem = document.createElement("li");
  listItem.innerText = input.value;
  todosList.push(input.value);
  input.value = "";
  const ul = document.querySelector("#todos");
  ul.appendChild(listItem);
});

// const timerValue = timer.value || 5000;

const timerInMinutes = document.getElementById("number");
timerInMinutes.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    const timer = timerInMinutes.value || 0.04;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        todos: todosList,
        timerValue: timer,
      });
    });
    window.close();
  }
});

const confirmList = document.querySelector("#confirm_list");
confirmList.addEventListener("click", () => {
  console.log("clicked");
  const timer = document.querySelector("#number");
  const timerValue = timer.value || 0.04;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      todos: todosList,
      timerValue: timerValue,
    });
  });
  window.close();
});
