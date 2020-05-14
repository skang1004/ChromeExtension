const todosList = [];
const addTodoButton = document.getElementById("add_todo");
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
});
