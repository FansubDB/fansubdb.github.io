/* Some global var */
var DEBUG = true;

var HOME = 1;
var ARCHIVE = 2;
var SEASON = 3;


/* Some defaults functions */
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
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

function readJsonFile(link, page, type) {
	var req = new XMLHttpRequest();
	writeLog(new Date() + " - Loading data from JSON file <" + link + ">");
	req.open('GET', link, true); //true for asynchronous

	req.onreadystatechange = function () {
		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
			if((req.status == 200) || (req.status == 304)) {
				writeLog(new Date() + " - Loading the");
				switch(page) {
				case HOME:
					writeLog("	HOME page");
					var objJson = JSON.parse(req.responseText);
					buildNavbar(objJson);
					break;

				case ARCHIVE:
					writeLog("	ARCHIVE page");
					var objJson = JSON.parse(req.responseText);
					buildArchive(objJson);
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

function readSerieFile(link) {
	var req = new XMLHttpRequest();
	req.open('GET', link, true); //true for asynchronous

	req.onreadystatechange = function () {
		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
			if((req.status == 200) || (req.status == 304)) {
				var objJson = JSON.parse(req.responseText);
				buildSerie(objJson);
			}
			else {
				writeLog(new Date() + " - Fail to load data");
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
		dataNavbar += '<li><a href="' + arr[i].url + '" title="' + arr[i].title + '">' + capitalizeFirstLetter(arr[i].lang) + '</a></li>';
	}

	writeDataInnerHtml('navbar-ul', dataNavbar);
	writeLog(" > End of the build of the NAVBAR - " + new Date());
}

function buildArchive(arr) {
	writeLog(" > Build of the ARCHIVE page (begin by the end) - " + new Date());

	removeTag('archive');
	var datArchive = '';

	for(i = arr.length-1; i >= 0; --i) {
		writeLog(" >> " + (i+1) + "th year loaded");
		datArchive += '<article><h3>' + arr[i].year + '</h3><ul>';

		for (j = arr[i].seasons.length-1; j >= 0; --j) {
			writeLog(" >>> " + (j+1) + "th season loaded");
			datArchive += '<li><a onmouseover="display(\'' + arr[i].seasons[j].deco + '\');"onmouseout="reset();" href="' + arr[i].url + arr[i].seasons[j].htmlUrl + '" >'+ capitalizeFirstLetter(arr[i].seasons[j].title) + '</a></li>';
		}
		datArchive += '</url></article>';
	}

	writeDataInnerHtml('archive', datArchive);
	writeLog(" > End of the build of the ARCHIVE page (begin by the end) - " + new Date());
}

/*In "onclick" of the button, TV = 0, OVA = 1 and MOVIE = 2.*/
function buildPage(arr, type) {
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

	var url ="";
	if(type === 1) {
		array = arr.ova;
		isActive('ova');
		url = "ova";
	}
	else if(type === 2) {
		array = arr.movie;
		isActive('movie');
		url = "movie";
	}
	else {
		array = arr.tv;
		isActive('tv');
		url = "tv";
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
			dataTable += '<tr id=' + array[i].hummingbird_id + '>';
			dataTable += '<td><div class="btn-group"><button onclick="copyToClipboard(\'' + encodeText(array[i].name) +'\')" class="btn btn-default" type="button" >' + array[i].name + '</button>';
			dataTable += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>';
			dataTable += '<ul class="dropdown-menu" role="menu" aria-labelledby="picture">';
			dataTable += '</ul></div></td>';

			dataTable += '<td>';

			readSerieFile('../' + url + '/' + array[i].json);

			dataTable += '</td></tr>';
		}
		dataTable += '</tbody>';
	}

	writeDataInnerHtml('tableAnime', dataTable);
	writeLog(" > End of the build of the TABLE - " + new Date());
}

function buildSerie(arr) {
	removeTag(arr.hummingbird_id);

	var dataSerie = "";
	dataSerie += '<tr id=' + arr.hummingbird_id + '>';
	dataSerie += '<td><div class="btn-group"><button onclick="copyToClipboard(\'' + encodeText(arr.name) +'\')" class="btn btn-default" type="button" >' + arr.name + '</button>';
	dataSerie += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>';
	dataSerie += '<ul class="dropdown-menu" role="menu" aria-labelledby="picture">';
	dataSerie += '<li role="presentation"><img src="' + arr.image + '" onerror="cantLoadImage(this, \'' + encodeText(arr.name) + '\')" ></li>';
	dataSerie += '</ul></div></td>';

	dataSerie += '<td>';

	for (j = 0; j < arr.group.length; ++j) {
	writeLog(" >>> " + (j+1) + "th group of the " + (i+1) +"th anime loaded")
		dataSerie += '<span class="' + arr.group[j].status +'">';

		for (k = 0; k < arr.group[j].detail.length; ++k) {
			writeLog(" >>>> " + (k+1) + "th name in the " + (j+1) + "th group of the " + (i+1) +"th anime loaded");
			if(arr.group[j].detail[k].url) {
				dataSerie += '<a href="' + arr.group[j].detail[k].url + '" target="_blank" >' + arr.group[j].detail[k].name + '</a>';
			}
			else {
				dataSerie += arr.group[j].detail[k].name;
			}
			if(k != arr.group[j].detail.length-1) {
				dataSerie += ' ' + String.fromCharCode(38) + ' ';
			}
		}
		dataTable += '</span>';
		if(j != arr.group.length-1) {
			dataSerie += '<br>';
		}
	}
	if (arr.group.length === 0) {
		dataSerie += 'N/A';
	}

	writeDataInnerHtml(arr.hummingbird_id, dataSerie);
}
