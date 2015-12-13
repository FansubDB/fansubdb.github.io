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

function writeList(id, actual_title, arr){
	writeMessage(id, actual_title);
	removeTag('list');
	var data = '';

	for(i = 0; i < arr.length; ++i) {
		for(j=0; j < arr[i].seasons.length; ++j) {
			data += '<li><a href="//'  + location.host + location.pathname + '?year=' + arr[i].year + '&season=' + arr[i].seasons[j].title + '">';
			data += capitalizeFirstLetter(arr[i].seasons[j].title) + '  '  + arr[i].year + '</a></li>';
		}
	}
	writeDataInnerHtml('list', data);
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
				var seasonObj = getObjects(yearObj, "title", decodeText(tmp[0]));

				if(yearObj.length === 1 && seasonObj.length === 1) { //one season and one year
					document.title = capitalizeFirstLetter(String(getValues(seasonObj, "title"))) + " " + yearObj[0].year;
					url = yearObj[0].url + getValues(seasonObj, "url");
				}
				else {
					//use last year and season available
					yearObj = objJson[objJson.length-1];
					seasonObj = yearObj.seasons[yearObj.seasons.length-1];

					document.title = capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year;
					url = yearObj.url + seasonObj.url;

					if((typeof tmp[0] === 'undefined') && (typeof tmp[1] === 'undefined'))//user don't define any param
						writeDataInnerHtml('warning', warningTemplate(yearObj.msg + ' ' + capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year));
					else if(typeof tmp[0] === 'undefined') //no season
						writeDataInnerHtml('warning', warningTemplate(yearObj.msg_season + ' ' + capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year));
					else if(typeof tmp[1] === 'undefined') //no year
						writeDataInnerHtml('warning', warningTemplate(yearObj.msg_year + ' ' + capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year));
					else //bad year or bad season
						writeDataInnerHtml('warning', warningTemplate(yearObj.msg_all + ' ' + capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year));
				}
				readJsonFile(url, SEASON);
				writeMessage('title', document.title);
				writeList('seasonlist', document.title, objJson);
				addOnClick('tv', url, 0);
				addOnClick('ova', url, 1);
				addOnClick('movie', url, 2);
			}
			else {
				writeLog("Fails to load data");
				writeMessage('tableAnime', 'Fail to load data…');
				break;
			}
		}
	};
	req.send(null);
}
