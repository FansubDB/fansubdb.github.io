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
	window.prompt("Copy to clipboard: Ctrl+C, Enter", decodeTitle(text));
}

function encodeTitle(text) {
	return encodeURIComponent(text);
}

function decodeTitle(text) {
	return decodeURIComponent(text).replace(/&apos;/g, "'");
}

function writeMessageTable(id, string) {
	document.getElementById(id).innerHTML = string;
}

function removeTag(id) {
	document.getElementById(id).innerHTML = '';
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
	writeLog(">Fail to load picture of: " + decodeTitle(title));
	return true;
}

function writeLog(text) {
	if (DEBUG) {
		console.log(text);
	}
}

function readJsonFile(link, page) {
	var req = new XMLHttpRequest();
	writeLog("Loading data from JSON file <" + link + ">");
	req.open('GET', link, true); //true for asynchronous

	req.onreadystatechange = function () {
		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
			if((req.status == 200) || (req.status == 304)) {
				switch(page) {
					writeLog("Loading the");
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
					buildTable(objJson);
					break;

				default:
					writeLog("	DEFAULT switch of succeed to load data");
					break;
				}
			}
			else {
				writeLog("Fail to load data");
				switch(page) {
				case HOME:
					writeLog("	of the HOME page");
					writeMessageTable('navbar', 'Fail to load data…');
					break;

				case ARCHIVE:
					writeLog("	of the ARCHIVE page");
					writeMessageTable('archive', 'Fail to load data…');
					break;

				case SEASON:
					writeLog("	of the SEASON page");
					writeMessageTable('tableAnime', 'Fail to load data…');
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
	writeLog(" * Build of the NAVBAR");

	removeTag('navbar-ul');
	var dataNavbar = '';

	for(i = 0; i < arr.length; ++i) {
		writeLog(" ** i=" + i);
		dataNavbar += '<li><a href="' + arr[i].url + '" title="' + arr[i].title + '">' + capitalizeFirstLetter(arr[i].lang) + '</a></li>';
	}

	writeDataInnerHtml('navbar-ul', dataNavbar);
}

function buildArchive(arr) {
	writeLog(" * Build of the ARCHIVE page");

	removeTag('archive');
	var datArchive = '';

	for(i = arr.length-1; i >= 0; --i) {
		writeLog(" ** i=" + i);
		datArchive += '<article><h3>' + arr[i].year + '</h3><ul>';

		for (j = arr[i].seasons.length-1; j >= 0; --j) {
			writeLog(" *** j=" + j);
			datArchive += '<li><a onmouseover="display(\'' + arr[i].seasons[j].deco + '\');"onmouseout="reset();" href="' + arr[i].url + arr[i].seasons[j].htmlUrl + '" >'+ capitalizeFirstLetter(arr[i].seasons[j].title) + '</a></li>';
		}
		datArchive += '</url></article>';
	}

	writeDataInnerHtml('archive', datArchive);
}

function buildTable(arr) {
	writeLog(" * Build of the TABLE");

	removeTag('tableAnime');
	var dataTable = '<thead><tr><th>' + capitalizeFirstLetter(arr.name) + '</th><th>' + capitalizeFirstLetter(arr.group) + '</th></tr></thead><tbody>';

	for(i = 0; i < arr.anime.length; ++i) {
		writeLog(" ** i=" + i);
		dataTable += '<tr>';
		dataTable += '<td><div class="btn-group"><button onclick="copyToClipboard(\'' + encodeTitle(arr.anime[i].name) +'\')" class="btn btn-default" type="button" >' + arr.anime[i].name + '</button>';
		dataTable += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>';
		dataTable += '<ul class="dropdown-menu" role="menu" aria-labelledby="picture">';
		dataTable += '<li role="presentation"><img src="' + arr.anime[i].image + '" onerror="cantLoadImage(this, \'' + encodeTitle(arr.anime[i].name) + '\')" ></li>';
		dataTable += '</ul></div></td>';

		dataTable += '<td>';

		for (j = 0; j < arr.anime[i].group.length; ++j) {
			writeLog(" *** j=" + j);
			dataTable += '<span class="' + arr.anime[i].group[j].status +'">';

			for (k = 0; k < arr.anime[i].group[j].detail.length; ++k) {
				writeLog(" **** k=" + k);
				if(arr.anime[i].group[j].detail[k].url) {
					dataTable += '<a href="' + arr.anime[i].group[j].detail[k].url + '" target="_blank" >' + arr.anime[i].group[j].detail[k].name + '</a>';
				}
				else {
					dataTable += arr.anime[i].group[j].detail[k].name;
				}
				if(k != arr.anime[i].group[j].detail.length-1) {
					dataTable += ' ' + String.fromCharCode(38) + ' ';
				}
			}
			dataTable += '</span>';
			if(j != arr.anime[i].group.length-1) {
				dataTable += '<br>';
			}
		}
		if (arr.anime[i].group.length === 0) {
			dataTable += 'N/A';
		}
		dataTable += '</td></tr>';
	}
	dataTable += '</tbody>';

	writeDataInnerHtml('tableAnime', dataTable);
}
