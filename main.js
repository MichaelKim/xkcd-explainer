var container = document.getElementById("middleContainer"); //container of comic & text
var displayed = false; //toggle explanation

var explainButton = document.createElement("div");
explainButton.innerHTML = '<a href="#" onclick="return false;" id="explain-button"><h2>Explanation</h2></a>';

var explainer = document.createElement("div"); //new div containing explanation
explainer.id = "explain-container";

explainButton.children[0].addEventListener("click", function(){
  displayed = !displayed;
  if(displayed) explainer.style.display = "block";
  else explainer.style.display = "none";
});

if(container !== null){ //valid xkcd comic
  container.appendChild(explainButton);
  container.appendChild(explainer);

  var url = document.location.href;
  var start = url.indexOf("xkcd.com") + 9;
  var len = url.substring(start).indexOf("/");
  var comicnum = url.substr(start, len);
  if(comicnum === ""){ //main page; get latest comic
    getJSON("https://explainxkcd.com/wiki/api.php?action=expandtemplates&format=json&text={{LATESTCOMIC}}", function(obj){
      comicnum = obj.expandtemplates["*"].replace(/\s+/g, "");
      loadExplain(comicnum);
    });
  }
  else loadExplain(comicnum); //comic number in url
}


function loadExplain(comic){
  getJSON("https://explainxkcd.com/wiki/api.php?action=query&prop=revisions&rvprop=content&format=json&redirects=1&titles=" + comic, function(obj){
    var pages = obj.query.pages;
    var page = pages[Object.keys(pages)[0]].revisions[0]["*"];

    var start = page.indexOf("{{incomplete|");
    if(start === -1){ //incomplete tag at the beginning of explanation
      start = page.indexOf("== Explanation ==") + 18;
      if(start === -1 + 18){
        start = page.indexOf("==Explanation==") + 16;
      }
      if(page[start] == "\n") start++;
    }
    else{ //complete explanation
      start = page.indexOf("\n", start) + 1;
    }
    var end = page.indexOf("==Transcript==") - 1;
    if(end === -1 - 1){
      end = page.indexOf("== Transcript ==") - 1;
    }

    //unescape html entities
    var rawExplain = page.substring(start, end);
    var temp = document.createElement("textarea");
    temp.innerHTML = rawExplain;
    var wikiExplain = temp.value;

    //parse wikitext into html
    var explanation = wikiparse(wikiExplain, comicnum);
    explainer.innerHTML = explanation + '<p><b>Read more at the <a href="http://explainxkcd.com/' + comic + '">explain xkcd wiki</a>.</b></p>';
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
