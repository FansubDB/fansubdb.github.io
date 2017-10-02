function infoKitsu(anime, kitsu_id) {
	if(kitsu_id) {
		var url = "https://kitsu.io/api/edge/";

		var req = new XMLHttpRequest();
		console.log('Loading data…');
		req.open('GET', url + "anime/" + kitsu_id, true); //true for asynchronous

		req.setRequestHeader("Accept", "application/vnd.api+json");
		req.setRequestHeader("Content-Type", "application/vnd.api+json");
		
		req.onreadystatechange = function () {
			if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
				if((req.status == 200) || (req.status == 304)) {
					var objJson = JSON.parse(req.responseText);
					addInfo(anime, kitsu_id, objJson.data);
				}
			}
		};
		req.send(null);
	}
}

function addInfo(anime, kitsu_id, arr) {
	removeTag('info_' + noSpace(anime));
	console.log('Adding kitsu info…');
	var dataInfo = '';

	dataInfo += '<li><img src="' + arr.attributes.posterImage.small + '" width="200px"></li>';
	dataInfo += '<li>Number of Episode: ' + episodeNumber(arr.attributes.episodeCount) + '</li>';
	dataInfo += '<li><a href="https://kitsu.io/anime/' + arr.id + '" target="_blank" title="' + arr.attributes.titles.en_jp + '">Kitsu URL</a></li>';

	writeDataInnerHtml('info_' + noSpace(anime), dataInfo);
}
