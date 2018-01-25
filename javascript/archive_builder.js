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
	// we show the page from 5*(page-1)+1 to 5*page
	for(i = (arr.length-1)-5*(page-1); (i >= arr.length -5*page) && (i >= 0); --i) {
		writeLog(" >> " + (i+1) + "th year loaded");
		data += '<article><h3>' + arr[i].year + '</h3><ul>';

		for (j = arr[i].seasons.length-1; j >= 0; --j) {
			writeLog(" >>> " + (j+1) + "th season loaded");
			data += '<li><a href="index.html?year=' + arr[i].year + "&season=" + arr[i].seasons[j].title + '" >'+ capitalizeFirstLetter(arr[i].seasons[j].title) + '</a></li>';
		}
		data += '</url></article>';
	}
	return data;
}

function buildArchive(arr) {
	writeLog(" > Build of the ARCHIVE page (begin by the end) - " + new Date());

	/* based on parser.js > parse() */
	var page;
	var tmp = [];

	var items = location.search.substr(1).split("&"); // first we remove the part after "?" and split this part with &

	for (var index = 0; index < items.length; index++) {
		tmp = items[index].split("=");

		// one parameter allowed : page
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
