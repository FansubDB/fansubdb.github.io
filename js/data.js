function jsonReader(link) {
	var req = new XMLHttpRequest();
	req.open('GET', link, false); 
	req.send(null);
	if((req.status == 200) || (req.status == 304) ) {
  		return(JSON.parse(req.responseText));
	}
}

function tableBuilder(arr){
	var dataTable = "";
	for(i = 0; i < arr.length; ++i) {
		dataTable += '<tr>';
		dataTable += '<td><a 	onmouseover="image(\'" + arr[i].image + "\');"onmouseout="reset();" >' + arr[i].anime + '</td>';
		dataTable += "<td>";
		for (j = 0; j < arr[i].fansub.length; ++j) {
			dataTable += arr[0].fansub[j].status ? arr[0].fansub[j].status : 'N/A';
			if(j != arr[i].fansub.length-1) {
				dataTable += "<br>";
			}
		}
		dataTable += "</td>";
	}
	return(dataTable);
}
