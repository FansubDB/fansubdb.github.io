/* Some defaults functions */
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
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


/* For HOME page */
function readJsonLangFile(link) {
	var req = new XMLHttpRequest();
	writeMessageTable('tableAnime', 'Loading table…');
	req.open('GET', link, true);

	req.onreadystatechange = function () {
  		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
     			if((req.status == 200) || (req.status == 304)) {
				var objJson = JSON.parse(req.responseText); 
				buildNavbar(objJson);
			}
     			else {
				writeMessageTable('tableAnime', 'Fail to load table…');
				console.log("Fail to load data.\n");
     			}
  		}
	};
	req.send(null);
}

function buildNavbar(arr){
	removeTag('navbar');
	var dataTable = '';
	for(i = 0; i < arr.length; ++i) {
		//dataTable += '<tr>';
	}

	writeDataInnerHtml('tableAnime', dataTable);
}


/* For SEASON pages*/
function readJsonTableFile(link) {
	var req = new XMLHttpRequest();
	writeMessageTable('tableAnime', 'Loading table…');
	req.open('GET', link, true);

	req.onreadystatechange = function () {
  		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
     			if((req.status == 200) || (req.status == 304)) {
				var objJson = JSON.parse(req.responseText); 
				buildTable(objJson);
			}
     			else {
				writeMessageTable('tableAnime', 'Fail to load table…');
				console.log("Fail to load data.\n");
     			}
  		}
	};
	req.send(null);
}

function buildTable(arr){
	removeTag('tableAnime');
	var dataTable = '<thead><tr><th>' + capitalizeFirstLetter(arr.name) + '</th><th>' + capitalizeFirstLetter(arr.group) + '</th></tr></thead><tbody>';
	for(i = 0; i < arr.anime.length; ++i) {
		dataTable += '<tr>';
		dataTable += '<td><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">' + arr.anime[i].name + '<span class="caret"></span></button>';
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
