/* Some global var */
var DEBUG = true;
var URL_DATA = "https://fansubdb.github.io/data/";

var HOME = 1;
var ARCHIVE = 2;
var SEASON = 3;


/* Some defaults functions */
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function noSpace(string) {
	return string.replace(/\s+/g, ''); /*https://stackoverflow.com/a/5963202*/
}

function copyToClipboard(text) {
	window.prompt("Copy to clipboard: Ctrl+C, Enter", decodeText(text));
}

function encodeText(text) {
	return encodeURIComponent(text);
}

function decodeText(text) {
	return decodeURIComponent(text).replace(/&apos;/g, "'");
}

function writeMessage(id, string) {
	document.getElementById(id).innerHTML = string;
}

function removeTag(id) {
	document.getElementById(id).innerHTML = '';
}

function updateButton(id){
	document.getElementById(id).className = "btn btn-default";
}

function isActive(id){
	document.getElementById(id).className += " active";
}

function writeDataInnerHtml(id, data) {
	var selectedElement = document.getElementById(id);
	var newSelectedElement = selectedElement.cloneNode(false);
	newSelectedElement.innerHTML = data;
	selectedElement.parentNode.replaceChild(newSelectedElement, selectedElement);
}

function cantLoadImage(source, title) {
	source.src = "";
	source.onerror = "";
	writeLog(">Fail to load picture of: " + decodeText(title));
	return true;
}

function writeLog(text) {
	if (DEBUG) {
		console.log(text);
	}
}

function warningTemplate(text) {
	return '<div class="alert alert-warning"><a href="#" class="close" data-dismiss="alert">&times;</a>' + text + '</div>';
}

function infoTemplate(text) {
	return '<div class="alert alert-info"><a href="#" class="close" data-dismiss="alert">&times;</a>' + text + '</div>';
}

function pagination(arrLength, yearPerPage, pageActive = 1) {
	if (arrLength <= yearPerPage) {
		return "";
	}
	var html = '<div class="text-center"><ul class="pagination">';
	for (i = 1; i < (Math.trunc(arrLength/yearPerPage) +1) ; ++i) {
		if (i == pageActive)
			html += '<li class="active"><a href="?page=' + i + '">' + i + '</a></li>';
		else
			html += '<li><a href="?page=' + i + '">' + i + '</a></li>';
	}
	html += '</ul></div>';
	return html;
}

function archiveYearShowing(arr, page = 1) {
	var data = "";
	//we show the page from 5*(page-1)+1 to 5*page
	for(i = (arr.length-1)-5*(page-1); (i >= arr.length -5*page) && (i >= 0); --i) {
		writeLog(" >> " + (i+1) + "th year loaded");
		data += '<article><h3>' + arr[i].year + '</h3><ul>';

		for (j = arr[i].seasons.length-1; j >= 0; --j) {
			writeLog(" >>> " + (j+1) + "th season loaded");
			data += '<li><a onmouseover="display(\'' + arr[i].seasons[j].deco + '\');"onmouseout="reset();" href="index.html?year=' + arr[i].year + "&season=" + arr[i].seasons[j].title + '" >'+ capitalizeFirstLetter(arr[i].seasons[j].title) + '</a></li>';
		}
		data += '</url></article>';
	}
	return data;
}

function readJsonFile(link, page, type = 0) {
	var req = new XMLHttpRequest();
	writeLog(new Date() + " - Loading data from JSON file <" + link + ">");
	req.open('GET', URL_DATA + link, true); //true for asynchronous

	req.onreadystatechange = function () {
		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
			if((req.status == 200) || (req.status == 304)) {
				writeLog(new Date() + " - Loading the");
				switch(page) {
				case HOME:
					writeLog("	HOME page");
					var objJson = JSON.parse(req.responseText);
					buildNavbar(objJson);
					buildHomePage(objJson);
					break;

				case ARCHIVE:
					writeLog("	ARCHIVE page");
					var objJson = JSON.parse(req.responseText);
					buildArchive(objJson.data);
					break;

				case SEASON:
					writeLog("	SEASON page");
					var objJson = JSON.parse(req.responseText);
					buildPage(objJson, type);
					break;

				default:
					writeLog("	DEFAULT switch of succeed to load data");
					break;
				}
			}
			else {
				writeLog(new Date() + " - Fail to load data");
				switch(page) {
				case HOME:
					writeLog("	of the HOME page");
					writeMessage('navbar', 'Fail to load data…');
					break;

				case ARCHIVE:
					writeLog("	of the ARCHIVE page");
					writeMessage('archive', 'Fail to load data…');
					break;

				case SEASON:
					writeLog("	of the SEASON page");
					writeMessage('tableAnime', 'Fail to load data…');
					break;

				default:
					writeLog("	of the DEFAULT switch. Weird!");
					break;
				}
			}
		}
	};
	req.send(null);
}

/* HTML Builder */
function buildNavbar(arr) {
	writeLog(" > Build of the NAVBAR - " + new Date());

	removeTag('navbar-ul');
	var dataNavbar = '';

	for(i = 0; i < arr.length; ++i) {
		writeLog(" >> " + (i+1) +"th language added");
		dataNavbar += '<li><a href="' + arr[i].index + '" title="' + arr[i].title + '">' + capitalizeFirstLetter(arr[i].lang) + '</a></li>';
	}

	writeDataInnerHtml('navbar-ul', dataNavbar);
	writeLog(" > End of the build of the NAVBAR - " + new Date());
}

function buildHomePage(arr) {
	writeLog(" > Build of the HOMEPAGE - " + new Date());

	removeTag('lang-row');
	var dataHomePage = '';

	for(i = 0; i < arr.length; ++i) {
		writeLog(" >> " + (i+1) +"th language added");
		dataHomePage += '<div class="col-lg-4">';
		dataHomePage += '<a href="' + arr[i].index + '" title="' + arr[i].title + '" >';
		dataHomePage += '<img class="img-circle" src="' + arr[i].flag + '" alt="' + capitalizeFirstLetter(arr[i].lang) + ' flag" width="140" height="140">';
		dataHomePage += '<h2>' + capitalizeFirstLetter(arr[i].lang) + '</h2>';
		dataHomePage += '<p><div class="btn btn-default" title="' + arr[i].title + '" role="button">' + arr[i]["view-page"] + ' &raquo;</div></p>'; //jsonObj['md-number'] 
		dataHomePage += '</a>';
		dataHomePage += '</div>';
	}

	writeDataInnerHtml('lang-row', dataHomePage);
	writeLog(" > End of the build of the HOMEPAGE - " + new Date());
}

function buildArchive(arr) {
	writeLog(" > Build of the ARCHIVE page (begin by the end) - " + new Date());

	/* based on parser.js > parse() */
	var page;
	var tmp = [];

	var items = location.search.substr(1).split("&");//first we remove the part after "?" and split this part with &

	for (var index = 0; index < items.length; index++) {
		tmp = items[index].split("=");

		//one parameter allowed : page
		if (tmp[0].search("page") != -1) {
			page = tmp[1];
		}
	}
	
	page = Number.parseInt(page);

	removeTag('archive');

	var datArchive = '';

	/* http://stackoverflow.com/a/14636652 */
	if (page === parseInt(page, 10)) {
		//show the correct page if it exists
		if ((page > 0) && (page <= Math.trunc(arr.length/5) +1)) {
			datArchive += archiveYearShowing(arr, page);
			datArchive += pagination(arr.length, 5, page);
		}
		else {
			datArchive += archiveYearShowing(arr);
			datArchive += pagination(arr.length, 5);
		}
	}
	else {
		datArchive += archiveYearShowing(arr);
		datArchive += pagination(arr.length, 5);
	}

	writeDataInnerHtml('archive', datArchive);
	writeLog(" > End of the build of the ARCHIVE page (begin by the end) - " + new Date());
}

/*In "onclick" of the button, TV = 0 (default), OVA = 1 and MOVIE = 2.*/
function buildPage(arr, type = 0) {
	var array = "";
	writeLog(" > Build of the BUTTONS - " + new Date());

	removeTag('tv');
	updateButton('tv');
	writeDataInnerHtml('tv', arr.lbl_tv);

	removeTag('ova');
	updateButton('ova');
	writeDataInnerHtml('ova', arr.lbl_ova);

	removeTag('movie');
	updateButton('movie');
	writeDataInnerHtml('movie', arr.lbl_movie);

	if(type === 1) {
		array = arr.ova;
		isActive('ova');
	}
	else if(type === 2) {
		array = arr.movie;
		isActive('movie');
	}
	else {
		array = arr.tv;
		isActive('tv');
	}

	writeLog(" > Build of the TABLE - " + new Date());

	removeTag('tableAnime');

	var datatable = "";
	if(array.length === 0) {
		dataTable = infoTemplate(arr.message);
	}
	else {
		dataTable = '<table class="table"><thead><tr><th>' + capitalizeFirstLetter(arr.name) + '</th><th>' + capitalizeFirstLetter(arr.group) + '</th></tr></thead><tbody>';

		for(i = 0; i < array.length; ++i) {
			writeLog(" >> " + (i+1) + "th anime loaded");
			dataTable += '<tr>';
			dataTable += '<td><div class="btn-group"><button onclick="copyToClipboard(\'' + encodeText(array[i].name) +'\')" class="btn btn-default" type="button" >' + array[i].name + '</button>';
			dataTable += '<button type="button" onclick="infoKitsu(\'' + array[i].name +'\')" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>';
			dataTable += '<ul class="dropdown-menu" role="menu" aria-labelledby="picture">';
			dataTable += '<li role="presentation"><img src="' + array[i].image + '" onerror="cantLoadImage(this, \'' + encodeText(array[i].name) + '\')" ></li>';
			dataTable += '<li role="separator" class="divider"></li>';
			dataTable += '<li role="presentation" id="info_' + noSpace(array[i].name') + '"></li>';
			dataTable += '</ul></div></td>';

			dataTable += '<td>';

			for (j = 0; j < array[i].group.length; ++j) {
				writeLog(" >>> " + (j+1) + "th group of the " + (i+1) +"th anime loaded")
				dataTable += '<span class="' + array[i].group[j].status +'">';
	
				for (k = 0; k < array[i].group[j].detail.length; ++k) {
					writeLog(" >>>> " + (k+1) + "th name in the " + (j+1) + "th group of the " + (i+1) +"th anime loaded");
					if(array[i].group[j].detail[k].url) {
						dataTable += '<a href="' + array[i].group[j].detail[k].url + '" target="_blank" >' + array[i].group[j].detail[k].name + '</a>';
					}
					else {
						dataTable += array[i].group[j].detail[k].name;
					}
					if(k != array[i].group[j].detail.length-1) {
						dataTable += ' ' + String.fromCharCode(38) + ' ';
					}
				}
				dataTable += '</span>';
				if(j != array[i].group.length-1) {
					dataTable += '<br>';
				}
			}
			if (array[i].group.length === 0) {
				dataTable += 'N/A';
			}
			dataTable += '</td></tr>';
		}
		dataTable += '</tbody>';
	}

	writeDataInnerHtml('tableAnime', dataTable);
	writeLog(" > End of the build of the TABLE - " + new Date());
}

function infoKitsu(anime) {
	var url = "https://kitsu.io/api/edge/";

	var req = new XMLHttpRequest();
	console.log('Loading data…');
	req.open('GET', url + "anime/?page[limit]=1&filter[text]=" + anime, true); //true for asynchronous

	req.setRequestHeader("Accept", "application/vnd.api+json");
	req.setRequestHeader("Content-Type", "application/vnd.api+json");
	
	req.onreadystatechange = function () {
		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
			if((req.status == 200) || (req.status == 304)) {
				var objJson = JSON.parse(req.responseText);
				addInfo(anime, objJson.data[0]);
			}
		}
	};
	req.send(null);
}

function addInfo(anime, arr) {
	removeTag('info_' + noSpace(anime));
	var dataInfo = '';

	dataInfo += '<li>Number of Episode: ' + arr.attributes.episodeCount + '</li>';
	dataInfo += '<li><a href="https://kitsu.io/anime/' + arr.id + '" target="_blank" title="' + arr.attributes.titles.en_jp + '">Kitsu URL</a></li>';

	writeDataInnerHtml('info_' + noSpace(anime), dataInfo);
}
