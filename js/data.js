function jsonReader(link) {
	var req = new XMLHttpRequest();
	req.open('GET', link, true);

	req.onreadystatechange = function () {
  		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
     			if((req.status == 200) || (req.status == 304)) {
				var objJson = JSON.parse(req.responseText);      
				tableBuilder(objJson);
			}
     			else
      			console.log("Fail to load data.\n");
  		}
	};
	req.send(null);
}

function tableBuilder(arr){
	var dataTable = '<tr><th>' + capitalizeFirstLetter(arr.name) + '</th><th>' + capitalizeFirstLetter(arr.group) + '</th></tr>';
	for(i = 0; i < arr.anime.length; ++i) {
		dataTable += '<tr>';
		dataTable += '<td><a 	onmouseover="image(\'' + arr.anime[i].image + '\');"onmouseout="reset();" >' + arr.anime[i].name + '</td>';
		dataTable += "<td>";
		for (j = 0; j < arr.anime[i].fansub.length; ++j) {
			dataTable += '<span class="' + arr.anime[i].fansub[j].status +'">';
			if(arr.anime[i].fansub[j].url) {
				dataTable += '<a href="' + arr.anime[i].fansub[j].url + '" target="_blank" >' + arr.anime[i].fansub[j].name + '</a>';
			}
			else {
				dataTable += arr.anime[i].fansub[j].name;
			}
			dataTable += '</span>';
			if(j != arr.anime[i].fansub.length-1) {
				dataTable += '<br>';
			}
		}
		if (arr.anime[i].fansub.length === 0) {
			dataTable += 'N/A';
		}
		dataTable += '</td>';
	}
	document.getElementById('tableAnime').innerHTML = dataTable;
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
