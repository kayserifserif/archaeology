// https://www.geekstrick.com/load-json-file-locally-using-pure-javascript/
function loadJSON(callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'metaphors.json', true); // Replace 'appDataServices' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);  
}

metaphors = {};
loadJSON(function(response) {
  metaphors = JSON.parse(response);
  console.log(metaphors);
});

hostname = window.location.hostname;
if (metaphors.hasOwnProperty(hostname)) {
  console.log("has");
}
