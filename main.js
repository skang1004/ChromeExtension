chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(request, sender, sendRequest) {
  const todos = request["todos"];
  const timerValue = request["timerValue"];
  const body = document.querySelector("body");
  const currentDisplay = window.getComputedStyle(body).display;
  const currentOpacity = window.getComputedStyle(body).opacity;
  console.log("currentopacity", currentOpacity);
  const currentTransition = window.getComputedStyle(body).transition;
  console.log("currentTransition", currentTransition);
  const timerInMS = timerValue * 60000;

  setTimeout(() => {
    console.log("inside setTime");
    body.style.transition = "opacity 3s";
    body.style.opacity = "0";
    //fade the display out using opacity
    // after display is = 'none'
    //grab the html element in html file
    //prepend our changes to that html element
    // add radio button or something for each element that checks if user finished task
    // add another button that grabs checked elements and deletes from the storage
    // onclick rerender the browser dom and also delete the stuff that was checked off
    // if list is empty, then reward the user with some congratulations or smth idk
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
