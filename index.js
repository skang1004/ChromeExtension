const todosList = [];
const addTodoButton = document.getElementById("add_todo");

//adding event listener for on keypress 'enter', push the inputted task onto todosList array
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

// adding event listener for on 'click', push inputted task onto todosList array
addTodoButton.addEventListener("click", () => {
  const input = document.querySelector("input");
  const listItem = document.createElement("li");
  listItem.innerText = input.value;
  todosList.push(input.value);
  input.value = "";
  const ul = document.querySelector("#todos");
  ul.appendChild(listItem);
});

// event listener for on keypress 'enter', it submits the current task list so main.js can read the information
const timerInMinutes = document.getElementById("number");
timerInMinutes.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    const timer = timerInMinutes.value || 0.06;

    // gets current tab and will repopulate the dom with main.js manipulations
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        todos: todosList,
        timerValue: timer,
      });
    });
    window.close();
  }
});

// event listener for on click submits information to main.js
const confirmList = document.querySelector("#confirm_list");
confirmList.addEventListener("click", () => {
  console.log("clicked");
  const timer = document.querySelector("#number");
  const timerValue = timer.value || 0.04;

  // gets tab information and sends it to main.js
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      todos: todosList,
      timerValue: timerValue,
    });
  });
  window.close();
});
