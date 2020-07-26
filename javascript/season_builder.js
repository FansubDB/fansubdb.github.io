function parse() {
	let tmp = [];
	let year, season;

	let items = location.search.substr(1).split("&");//first we remove the part after "?" and split this part with &

	for (let index = 0; index < items.length; index++) {
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
	let data = '';

	for(let i = arr.length-1; i >= 0 && i > (arr.length-1 -2); --i) {
		for (let j = arr[i].seasons.length-1; j >= 0; --j) {
			data += '<a class="dropdown-item" href="?year=' + arr[i].year + '&season=' + arr[i].seasons[j].title + '">';
			data += capitalizeFirstLetter(arr[i].seasons[j].title) + '  '  + arr[i].year + '</a>';
		}
	}
	data += '<div class="dropdown-divider"></div>';
	data += '<a class="dropdown-item" href="' + document.getElementById("archive").href + '" >' + document.getElementById("archive").innerHTML + '</a>';

	writeDataInnerHtml('list', data);
}

function readListJsonFile(link, lang) {
	let req = new XMLHttpRequest();
	req.open('GET', URL_DATA + lang + "/" + link, true); //true for asynchronous

	req.onload = function () {
		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
			if((req.status == 200) || (req.status == 304)) {
				let tmp = parse();

				let objJson = JSON.parse(req.responseText);

				let dataJson = objJson.data;

				let url = "";
				let yearObj = getObjects(dataJson, "year", tmp[1]);
				let seasonObj = getObjects(yearObj, "title", decodeText(tmp[0]));
				let title = "";
				
				if(yearObj.length === 1 && seasonObj.length === 1) { //one season and one year
					title = capitalizeFirstLetter(String(getValues(seasonObj, "title"))) + " " + yearObj[0].year;
					document.title =  title + " | " + document.title;
					url = yearObj[0].url + getValues(seasonObj, "url");
				}
				else {
					//use last year and season available
					yearObj = dataJson[dataJson.length-1];
					seasonObj = yearObj.seasons[yearObj.seasons.length-1];

					title = capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year;
					document.title = title + " | " + document.title;
					url = yearObj.url + seasonObj.url;

					if((typeof tmp[0] === 'undefined') && (typeof tmp[1] === 'undefined')) {//user don't define any param
						writeDataInnerHtml('warning', warningTemplate(objJson.datafrom_msg + ' ' + capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year));
					}
					else { //no definied year or no definied season
						writeDataInnerHtml('warning', warningTemplate(objJson.erroryearorseason_msg + ' ' + capitalizeFirstLetter(seasonObj.title) + " " + yearObj.year));
					}
				}
				readJsonFile(lang + "/" + url, SEASON);
				writeMessage('title', title);
				writeList('seasonlist', title, dataJson);
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

function buildPage(arr, type = TV) {
	let array = "";
	writeLog(" > Build of the BUTTONS - " + new Date());

	removeTag('tv');
	updateButton('tv');
	writeDataInnerHtml('tv', arr.tv_lbl);

	removeTag('ova');
	updateButton('ova');
	writeDataInnerHtml('ova', arr.ova_lbl);

	removeTag('movie');
	updateButton('movie');
	writeDataInnerHtml('movie', arr.movie_lbl);

	if(type === OVA) {
		array = arr.ova;
		isActive('ova');
	}
	else if(type === MOVIE) {
		array = arr.movie;
		isActive('movie');
	}
	else {
		array = arr.tv;
		isActive('tv');
	}

	writeLog(" > Build of the TABLE - " + new Date());

	removeTag('tableAnime');

	let dataTable = "";
	if(typeof array === 'undefined' || array.length === 0) {
		dataTable = infoTemplate(arr.message_empty_list);
	}
	else {
		dataTable = '<table class="table"><thead><tr><th>' + capitalizeFirstLetter(arr.name_lbl) + '</th><th>' + capitalizeFirstLetter(arr.group_lbl) + '</th></tr></thead><tbody>';

		for(let i = 0; i < array.length; ++i) {
			writeLog(" >> " + (i+1) + "th anime loaded");
			dataTable += '<tr>';
			dataTable += '<td><div class="btn-group"><button onclick="copyToClipboard(\'' + encodeHTMLEntities(array[i].name) +'\')" class="btn btn-default btn-outline-secondary" type="button" >' + array[i].name + '</button>';
			dataTable += '<button type="button" onclick="infoKitsu(\'' + encodeHTMLEntities(array[i].name) +'\')" class="btn btn-default btn-outline-secondary dropdown-toggle dropdown-toggle-split" id="btn_' + encodeHTMLEntities(array[i].name) + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent"><span class="sr-only">Toggle Dropdown</span></button>';
			dataTable += '<ul class="dropdown-menu" aria-labelledby="btn_' + encodeHTMLEntities(array[i].name) + '">';
			dataTable += '<li role="presentation"><img src="' + array[i].image + '" onerror="cantLoadImage(\'' + array[i].image + '\', \'' + encodeHTMLEntities(array[i].name) + '\')" ></li>';
			dataTable += '<li class="dropdown-divider"></li>';
			dataTable += '<li role="presentation" id="info_' + encodeHTMLEntities(array[i].name) + '"></li>';
			dataTable += '</ul></div></td>';

			dataTable += '<td>';

			for (let j = 0; j < array[i].groups.length; ++j) {
				writeLog(" >>> " + (j+1) + "th group of the " + (i+1) +"th anime loaded")
				dataTable += '<span class="' + array[i].groups[j].status +'">';
	
				for (let k = 0; k < array[i].groups[j].detail.length; ++k) {
					writeLog(" >>>> " + (k+1) + "th name in the " + (j+1) + "th group of the " + (i+1) +"th anime loaded");
					dataTable += array[i].groups[j].detail[k].name;

					if(k != array[i].groups[j].detail.length-1) {
						dataTable += ' ' + String.fromCharCode(38) + ' ';
					}
				}
				dataTable += '</span>';
				if(j != array[i].groups.length-1) {
					dataTable += '<br>';
				}
			}
			if (array[i].groups.length === 0) {
				dataTable += 'N/A';
			}
			dataTable += '</td></tr>';
		}
		dataTable += '</tbody>';
	}

	writeDataInnerHtml('tableAnime', dataTable);
	writeLog(" > End of the build of the TABLE - " + new Date());
}
