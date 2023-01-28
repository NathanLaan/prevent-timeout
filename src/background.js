function clog(m) {
  const d = new Date();
  console.log(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} LOG: ${m}`);
}

let running = false;
let preventURL = "";
let intervalFunction;
const sleepTime = 5000;

function preventTimeout() {
  //urlObject = new URL(preventURL)
  //fetch(urlObject.origin)
  fetch(preventURL)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  return true; // Asynchronous
}

chrome.action.onClicked.addListener(function (tab) {
  try {
    if(running){
      running = !running;
      clog("Stopping Prevent-Timeout.");
      clearInterval(intervalFunction);
      chrome.action.setTitle({ title: "Prevent-Timeout STOPPED" });
    } else {
      running = !running;
      preventURL = tab.url;
      clog("Starting Prevent-Timeout: " + preventURL);
      intervalFunction = setInterval(preventTimeout, sleepTime);
      //chrome.action.setTitle("RUNNING: " + preventURL);
      chrome.action.setTitle({ title: "Prevent-Timeout RUNNING: " + new URL(preventURL).origin });
    }
  } catch(err) {
    clog(err);
  }
  // NOT NEEDED return true;
});

//
// TODO: clearInterval on browser close.
//
