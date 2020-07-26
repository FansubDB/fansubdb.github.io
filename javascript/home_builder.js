function buildNavbar(arr) {
	writeLog(" > Build of the NAVBAR - " + new Date());

	removeTag('navbar-ul');
	let dataNavbar = '';

	for(let i = 0; i < arr.length; ++i) {
		writeLog(" >> " + (i+1) +"th language added");
		dataNavbar += '<li class="nav-item"><a class="nav-link" href="' + arr[i].url + 'index.html" title="' + capitalizeFirstLetter(arr[i].lang) + '">' + capitalizeFirstLetter(arr[i].lang) + '</a></li>';
	}

	writeDataInnerHtml('navbar-ul', dataNavbar);
	writeLog(" > End of the build of the NAVBAR - " + new Date());
}

function buildHomePage(arr) {
	writeLog(" > Build of the HOMEPAGE - " + new Date());

	removeTag('lang-row');
	let dataHomePage = '';

	for(let i = 0; i < arr.length; ++i) {
		writeLog(" >> " + (i+1) +"th language added");
		dataHomePage += '<div class="col-lg-' + (12/NB_FLAG) + ' col-centered text-center">';
		dataHomePage += '<a href="' + arr[i].url + 'index.html" title="' + arr[i].title + '" >';
		dataHomePage += '<img class="rounded-circle" src="' + arr[i].flag + '" alt="' + capitalizeFirstLetter(arr[i].lang) + ' flag" width="140" height="140">';
		dataHomePage += '<h2>' + capitalizeFirstLetter(arr[i].lang) + '</h2>';
		dataHomePage += '<p><div class="btn btn-default btn-outline-dark" title="' + arr[i].title + '" role="button">' + arr[i]["goto_lbl"] + ' &raquo;</div></p>'; //jsonObj['md-number'] 
		dataHomePage += '</a>';
		dataHomePage += '</div>';
	}

	writeDataInnerHtml('lang-row', dataHomePage);
	writeLog(" > End of the build of the HOMEPAGE - " + new Date());
}