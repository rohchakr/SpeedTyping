
var inputJson = "";
var request = new XMLHttpRequest();
//request.open("GET", "input.json");
request.open("GET","https://rohchakr.github.io/SpeedTyping/input.json");
request.onreadystatechange = function() {
  if(request.readyState===4 && request.status===200) {
    inputJson = JSON.parse(request.responseText);
    // we can initially have some progress image and stop that here
    stepsAfterLoadingData();
  }
}
request.send();


var frameHeight = 400;
var frameWidth = 400;
var numTiles = 6;
var tileHeight = frameHeight/numTiles;
var tileWidth = frameWidth;

var requiredString = "";
var requiredCharacter = "";
var requiredStringIndex = 0;

var frame = d3.select("#content").append("svg")
                                    .attr("height",frameHeight)
                                    .attr("width",frameWidth);

var tileGroup = frame.append("g");

var userInputText = d3.select("#content").append("input")
                                            .attr("type","text")
                                            .attr("id","userInputText")
                                            .attr("style","width:"+tileWidth+"px; height: "+tileHeight+"px;");

//$("#userInputText").keydown(
  //function() {
    // if string has finished
    // if in the beginning or middle
//    console.log(event.key);
//});
//$("#userInputText").keyup(
//  function() {
//    console.log(event.key);
//});
$("#userInputText").keypress(
  function() {
    console.log(event.key);
    if(event.key === requiredString.charAt(requiredStringIndex)) {
      incrementRequiredStringIndex();
    } else {
      console.log(event.key,requiredString.charAt(requiredStringIndex));
    }
});


function computeNewString() {
  // need to randomize this
  var randomIndex = Math.floor(Math.random() * inputJson.length);
  return inputJson[randomIndex].name;
}  
function incrementRequiredStringIndex() {
  requiredStringIndex ++;
  if (requiredStringIndex === requiredString.length) {
    requiredString = computeNewString();
    requiredStringIndex = 0;
    // update text in svg
    updateTileGroupText(requiredString);
  }
  console.log("new character: "+requiredString.charAt(requiredStringIndex));
  // some styling changes
}
function updateTileGroupText(requiredString) {
  $(".tileText")[0].innerHTML = requiredString;
}

function stepsAfterLoadingData() {
  requiredString = computeNewString();
  requiredStringIndex = 0;
  requiredCharacter = requiredString.charAt(requiredStringIndex);
  
  console.log(requiredString);
  tileGroup.append("rect")
              .attr("class","wordTile")
              .attr("style","fill:#e6ccb3; opacity: 0.5;")
              .attr("height",tileHeight)
              .attr("width",tileWidth)
              .attr("x",0)
              .attr("y",0);
  tileGroup.append("text")
              .attr("class","tileText")
              .text(requiredString)
              .attr("x",20)
              .attr("y",20);
  $("#userInputText").focus();
}
