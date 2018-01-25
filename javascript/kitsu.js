function infoKitsu(anime) {
	var url = "https://kitsu.io/api/edge/";

	var req = new XMLHttpRequest();
	console.log('Loading data…');
	req.open('GET', url + "anime/?page[limit]=1&filter[text]=" + anime, true); // true for asynchronous

	req.setRequestHeader("Accept", "application/vnd.api+json");
	req.setRequestHeader("Content-Type", "application/vnd.api+json");
	
	req.onreadystatechange = function () {
		if (req.readyState == 4) { // 4 == XMLHttpRequest.DONE ie8+
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
