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

	for(i = arr.length-1; i >= 0 && i > (arr.length-1 -2); --i) {
		for (j = arr[i].seasons.length-1; j >= 0; --j) {
			data += '<li><a href="?year=' + arr[i].year + '&season=' + arr[i].seasons[j].title + '">';
			data += capitalizeFirstLetter(arr[i].seasons[j].title) + '  '  + arr[i].year + '</a></li>';
		}
	}
	data += '<li role="separator" class="divider"></li>';
	data += '<li><a href="archives.html" >Archives</a></li>';

	writeDataInnerHtml('list', data);
}

function readListJsonFile(link, lang) {
	var req = new XMLHttpRequest();
	req.open('GET', URL_DATA + lang + "/" + link, true); //true for asynchronous

	req.onreadystatechange = function () {
		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
			if((req.status == 200) || (req.status == 304)) {
				var tmp = parse();

				var objJson = JSON.parse(req.responseText);

				var dataJson = objJson.data;

				var url = "";
				var yearObj = getObjects(dataJson, "year", tmp[1]);
				var seasonObj = getObjects(yearObj, "title", decodeText(tmp[0]));

				if(yearObj.length === 1 && seasonObj.length === 1) { //one season and one year
					document.title = capitalizeFirstLetter(String(getValues(seasonObj, "title"))) + " " + yearObj[0].year + " | " + document.title;
					url = yearObj[0].url + getValues(seasonObj, "url");
				}
				else {
					//use last year and season available
					yearObj = dataJson[dataJson.length-1];
					seasonObj = yearObj.seasons[yearObj.seasons.length-1];

					document.title = capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year + " | " + document.title;
					url = yearObj.url + seasonObj.url;

					if((typeof tmp[0] === 'undefined') && (typeof tmp[1] === 'undefined')) {//user don't define any param
						writeDataInnerHtml('warning', warningTemplate(objJson.msg + ' ' + capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year));
					}
					else if(typeof tmp[0] === 'undefined') { //no season
						writeDataInnerHtml('warning', warningTemplate(objJson.msg_season + ' ' + capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year));
					}
					else if(typeof tmp[1] === 'undefined') { //no year
						writeDataInnerHtml('warning', warningTemplate(objJson.msg_year + ' ' + capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year));
					}
					else { //bad year or bad season
						writeDataInnerHtml('warning', warningTemplate(objJson.msg_all + ' ' + capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year));
					}
				}
				readJsonFile(lang + "/" + url, SEASON);
				writeMessage('title', document.title);
				writeList('seasonlist', document.title, dataJson);
				addOnClick('tv', lang + "/" + url, 0);
				addOnClick('ova', lang + "/" + url, 1);
				addOnClick('movie', lang + "/" + url, 2);
			}
			else {
				writeLog("Fails to load data");
				writeMessage('tableAnime', 'Fail to load data…');
			}
		}
	};
	req.send(null);
}
