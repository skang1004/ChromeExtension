chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(request, sender, sendRequest) {
  const todos = request["todos"];
  console.log("todos", todos);
  const timerValue = request["timerValue"];
  const body = document.querySelector("body");
  const currentDisplay = window.getComputedStyle(body).display;
  const currentOpacity = window.getComputedStyle(body).opacity;
  console.log("currentopacity", currentOpacity);
  const currentTransition = window.getComputedStyle(body).transition;
  console.log("currentTransition", currentTransition);
  const timerInMS = timerValue * 60000;

  setTimeout(() => {
    body.style.transition = "opacity 5s";
    body.style.opacity = "0";
    setTimeout(() => {
      // after display is = 'none'
      body.style.display = "none";
      const html = document.querySelector("html");
      const ul = document.createElement("ul");
      ul.setAttribute("class", "ul");
      ul.style.marginTop = "20rem";
      ul.style.textAlign = "center";
      ul.style.fontSize = "4.5rem";
      ul.style.fontFamily = "Arial, Helvetica, sans-serif";

      for (let i = 0; i < todos.length; i++) {
        const li = document.createElement("li");
        li.innerText = todos[i];
        li.setAttribute("id", `${i}`);
        li.style.listStyle = "none";
        li.style.fontFamily = "Arial, Helvetica, sans-serif";
        ul.appendChild(li);
        li.addEventListener("click", (event) => {
          const currentID = event.target.id;
          const currentItem = document.getElementById(currentID);
          //   const currentItemText = currentItem.innerText;
          if (
            window.getComputedStyle(currentItem).textDecoration !==
            "line-through"
          ) {
            currentItem.style.textDecoration = "line-through";
          }
        });
      }
      const button = document.createElement("button");
      button.innerText = "Back to Browsing!";

      //troubleshooting bringing back the display on button 'bring back display'
      button.addEventListener("click", (event) => {
        html.removeChild("ul");
        body.style.display = currentDisplay;
        body.style.opacity = currentOpacity;
        setTimeout(() => {
          body.style.transition = currentTransition;
        }, 3000);
      });
      ul.appendChild(button);
      html.prepend(ul);

      //grab the html element in html file
      //prepend our changes to that html element
      // add radio button or something for each element that checks if user finished task
      // add another button that grabs checked elements and deletes from the storage
      // onclick rerender the browser dom and also delete the stuff that was checked off
      // if list is empty, then reward the user with some congratulations or smth idk

      // also fade in our stuff
    }, 5000);
    //fade the display out using opacity
  }, timerInMS);
  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
}

// const todosArray = [];
// chrome.storage.sync.get("total", (result) => {
//   if (result === 0) alert("Please add todos in the popup. (ctrl+shift+l)");

//   for (let i = 0; i < result; i++) {
//     chrome.storage.sync.get(i, (result) => {
//       todosArray.push(result);
//     });
//   }
// });
// console.log("this is todosArray", todosArray);

// // chrome.storage.sync.get("1", function (result) {
// //   console.log("value is ", result);
// // });
