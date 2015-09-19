/* Some global var */
var HOME = 1;
var ARCHIVE = 2;
var SEASON = 3;


/* Some defaults functions */
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function copyToClipboard(text) {
	window.prompt("Copy to clipboard: Ctrl+C, Enter", decodeURIComponent(text).replace(/&apos;/g, "'"));
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

function readJsonFile(link, page) {
	var req = new XMLHttpRequest();
	console.log('Loading data…');
	req.open('GET', link, true); //true for asynchronous

	req.onreadystatechange = function () {
		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
			if((req.status == 200) || (req.status == 304)) {
				switch(page) {
				case HOME:
					var objJson = JSON.parse(req.responseText);
					buildNavbar(objJson);
					break;

				case ARCHIVE:
					var objJson = JSON.parse(req.responseText);
					buildArchive(objJson);
					break;

				case SEASON:
					var objJson = JSON.parse(req.responseText);
					buildTable(objJson);
					break;

				default:
					console.log("default switch.\N");
					break;
				}
			}
			else {
				console.log("Fail to load data.\n");
				switch(page) {
				case HOME:
					writeMessageTable('navbar', 'Fail to load data…');
					break;
	
				case ARCHIVE:
					writeMessageTable('archive', 'Fail to load data…');
					break;

				case SEASON:
					writeMessageTable('tableAnime', 'Fail to load data…');
					break;

				default:
					break;
				}
			}
		}
	};
	req.send(null);
}

/* HTML Builder */
function buildNavbar(arr) {
	removeTag('navbar');
	var dataNavbar = '';
	for(i = 0; i < arr.length; ++i) {
		dataNavbar += '<li><a href="' + arr[i].url + '" title="' + arr[i].title + '">' + capitalizeFirstLetter(arr[i].lang) + '</a></li>';
	}

	writeDataInnerHtml('navbar', dataNavbar);
}

function buildArchive(arr) {
	removeTag('archive');
	var datArchive = '';
	for(i = arr.length-1; i >= 0; --i) {
		datArchive += '<article><h3>' + arr[i].year + '</h3><ul>';
		for (j = arr[i].seasons.length-1; j >= 0; --j) {
			datArchive += '<li><a onmouseover="display(\'' + arr[i].seasons[j].deco + '\');"onmouseout="reset();" href="' + arr[i].url + arr[i].seasons[j].htmlUrl + '" >'+ capitalizeFirstLetter(arr[i].seasons[j].title) + '</a></li>';
		}
		datArchive += '</url></article>';
	}
	
	writeDataInnerHtml('archive', datArchive);
}

function buildTable(arr) {
	removeTag('tableAnime');
	var dataTable = '<thead><tr><th>' + capitalizeFirstLetter(arr.name) + '</th><th>' + capitalizeFirstLetter(arr.group) + '</th></tr></thead><tbody>';
	for(i = 0; i < arr.anime.length; ++i) {
		dataTable += '<tr>';
		dataTable += '<td><div class="btn-group"><button onclick="copyToClipboard(\'' + encodeURIComponent(arr.anime[i].name) +'\')" class="btn btn-default" type="button" >' + arr.anime[i].name + '</button>';
		dataTable += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>';
		dataTable += '<ul class="dropdown-menu" role="menu" aria-labelledby="picture">';
		dataTable += '<li role="presentation"><img src="' + arr.anime[i].image + '"></li>';
		dataTable += '</ul></div></td>';

		//console.log("end of loading anime " + i + "\n");
		dataTable += '<td>';
		for (j = 0; j < arr.anime[i].group.length; ++j) {
			dataTable += '<span class="' + arr.anime[i].group[j].status +'">';
			//console.log("end of loading group " + j + "\n");
			for (k = 0; k < arr.anime[i].group[j].detail.length; ++k) {
				if(arr.anime[i].group[j].detail[k].url) {
					dataTable += '<a href="' + arr.anime[i].group[j].detail[k].url + '" target="_blank" >' + arr.anime[i].group[j].detail[k].name + '</a>';
				}
				else {
					dataTable += arr.anime[i].group[j].detail[k].name;
				}
				if(k != arr.anime[i].group[j].detail.length-1) {
					dataTable += ' ' + String.fromCharCode(38) + ' ';
				}
				//console.log("end of loading name of group " + k + "\n");
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
