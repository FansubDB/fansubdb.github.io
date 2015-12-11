function parse() {
  var tmp = [];
  var year, season;

  var items = location.search.substr(1).split("&");//first we remove the part after "?" and split this part with &

  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split("=");

    //two parameters allowed : year, season
    if (tmp[0].search("year") != -1) {
      year = tmp[1];
    }
    if (tmp[0].search("season") != -1) {
      season = tmp[1];
    }
  }
  return new Array(season, year);
}

function addOnClick(id, url, num){
	document.getElementById(id).setAttribute("onClick", "readJsonFile(\'" + url + "\', SEASON, " + num + ")");
}

function readListJsonFile(link) {
	var req = new XMLHttpRequest();
	req.open('GET', link, true); //true for asynchronous

	req.onreadystatechange = function () {
		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
			if((req.status == 200) || (req.status == 304)) {
				var tmp = parse();
				var objJson = JSON.parse(req.responseText);

				var url = "";
				var yearObj = getObjects(objJson, "year", tmp[1]);

				if(yearObj.length === 1 && getObjects(yearObj, "season", tmp[0]).length === 1) {
					var seasonObj = getObjects(yearObj, "season", tmp[0]);

					document.title = capitalizeFirstLetter(String(getValues(seasonObj, "title"))) + " " + yearObj[0].year;
					url = yearObj[0].url + getValues(seasonObj, "url");
				}
				else {
					yearObj = objJson[objJson.length-1];
					var seasonObj = yearObj.seasons[yearObj.seasons.length-1];

					document.title = capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year;
					url = yearObj.url + seasonObj.url;

					if((typeof tmp[0] !== 'undefined') && (typeof tmp[1] !== 'undefined'))
						writeDataInnerHtml('warning', warningTemplate("Use data from " + capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year));
				}
				readJsonFile(url, SEASON);
				writeMessage('title', document.title);
				addOnClick('tv', url, 0);
				addOnClick('ova', url, 1);
				addOnClick('movie', url, 2);
			}
			else {

			}
		}
	};
	req.send(null);
}
