var container = document.getElementById("middleContainer"); //container of comic & text
var explainer = document.createElement("div"); //new div containing explanation
explainer.id = "explain-container";
container.appendChild(explainer);

var url = document.location.href;
var comicnum = url.replace(/\D/g, '');
if(comicnum === ""){
  getJSON("http://explainxkcd.com/wiki/api.php?action=expandtemplates&format=json&text={{LATESTCOMIC}}", function(obj){
    comicnum = obj.expandtemplates["*"];
    loadExplain(comicnum);
  });
}
else loadExplain(comicnum);

function loadExplain(comic){
  console.log("Loading comic #" + comic);

  getJSON("http://explainxkcd.com/wiki/api.php?action=query&prop=revisions&rvprop=content&format=json&redirects=1&titles=" + comic, function(obj){
    var pages = obj.query.pages;
    var page = pages[Object.keys(pages)[0]].revisions[0]["*"];

    var start = page.indexOf("incomplete");
    if(start === -1){ //incomplete tag at the beginning of explanation
      start = page.indexOf("==Explanation==") + 16;
      if(page[start] == "\n") start++;
    }
    else{ //complete explanation
      start = page.indexOf("\n", start) + 1;
    }
    var end = page.indexOf("==Transcript==") - 1;

    //unescape html entities
    var rawExplain = page.substring(start, end);
    var temp = document.createElement("textarea");
    temp.innerHTML = rawExplain;
    var wikiExplain = temp.value;

    var explanation = wikiparse(wikiExplain);
    explainer.innerHTML += "<h2>Explanation</h2>" + explanation;
  });
}


function getJSON(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url, true);

  request.onreadystatechange = function(){
    if(this.readyState === 4){
      if(this.status >= 200 && this.status < 400){
        var response = this.responseText;
        callback(JSON.parse(response));
      }
    }
  };
  request.send();
}
