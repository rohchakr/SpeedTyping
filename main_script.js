document.getElementById("content").innerHTML="Hello!";

var inputJson = "";
var request = new XMLHttpRequest();
//request.open("GET", "input.json");
request.open("GET","https://rohchakr.github.io/SpeedTyping/input.json");
request.onreadystatechange = function() {
  if(request.readyState===4 && request.status===200) {
    inputJson = JSON.parse(request.responseText);
    // we can initially have some progress image and stop that here
  }
}
request.send();

// need to do exception handling for the above xhr

