//this is what allows main.js to see what was sent from index.js
chrome.runtime.onMessage.addListener(gotMessage);

// reads the information passed through and manipulates current tab with javascript manipulation
function gotMessage(request, sender, sendRequest) {
  const todos = request["todos"];
  const timerValue = request["timerValue"];
  const body = document.querySelector("body");

  const currentDisplay = window.getComputedStyle(body).display; //gets current tab display css
  const currentOpacity = window.getComputedStyle(body).opacity; //gets current opacity
  const currentTransition = window.getComputedStyle(body).transition; //current transition

  //calculating inputted time into milliseconds
  const timerInMS = timerValue * 60000;

  //after inputted time, setTimeout is called and sets opacity to 0 in 5 seconds
  setTimeout(() => {
    body.style.transition = "opacity 5s";
    body.style.opacity = "0";

    //this settimeout is called after 5 seconds and hides the body while repopulating dom with todo list
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

        // event listener for clicking on indidivual task to strike a line through
        li.addEventListener("click", (event) => {
          const currentID = event.target.id;
          const currentItem = document.getElementById(currentID);
          if (
            window.getComputedStyle(currentItem).textDecoration !==
            "line-through"
          ) {
            currentItem.style.textDecoration = "line-through";
          }
        });
      }
      // button that brings back the original display and hides the todo list
      const button = document.createElement("button");
      button.innerText = "Back to Browsing!";

      // event listener for button click that brings everything back
      button.addEventListener("click", (event) => {
        ul.remove();
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
  }, timerInMS);
}
