document.getElementById("content").innerHTML="Hello!";

var request = new XMLHttpRequest();
request.open("GET", "input.json");
request.send();
