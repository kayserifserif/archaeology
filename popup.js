// DATA

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

// TAB

function update(url) {
  url = url.split("//")[1];
  document.getElementById("url").innerHTML = url;
  if (metaphors.hasOwnProperty(url)) {
    let m = metaphors[url]["metaphors"];
    let current = 0;
    setInterval(function() {
      document.getElementById("metaphor").innerHTML = m[current];
      current++;
      if (current >= m.length) {
        current = 0;
      }
    }, 1000);
  } else {
    document.getElementById("metaphor").innerHTML = "...";
  }
}

browser.tabs.onUpdated.addListener(function(activeInfo) {
  browser.tabs.query({currentWindow: true})
    .then(function(tabs) {
      update(tabs[0].url);
    });
});


let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then((tabs) => {
  update(tabs[0].url);
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then((tabs) => {
    update(tabs[0].url);
  });
});