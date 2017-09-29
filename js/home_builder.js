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
