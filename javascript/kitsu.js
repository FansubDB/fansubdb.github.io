function infoKitsu(anime) {
	var url = "https://kitsu.io/api/edge/";

	var req = new XMLHttpRequest();
	console.log('Loading data…');
	req.open('GET', url + "anime/?page[limit]=1&filter[text]=" + anime + "&include=animeProductions.producer, true); // true for asynchronous

	req.setRequestHeader("Accept", "application/vnd.api+json");
	req.setRequestHeader("Content-Type", "application/vnd.api+json");
	
	req.onreadystatechange = function () {
		if (req.readyState == 4) { // 4 == XMLHttpRequest.DONE ie8+
			if((req.status == 200) || (req.status == 304)) {
				var objJson = JSON.parse(req.responseText);
				addInfo(anime, objJson);
			}
		}
	};
	req.send(null);
}

function addInfo(anime, arr) {
	removeTag('info_' + noSpace(anime));
	var dataInfo = '';

	dataInfo += '<li>Number of Episodes: ' + haveTheNumberOfEpisodes(arr) + '</li>';
	dataInfo += '<li>Premiere Date: ' + haveThePremiereDate(arr) + '</li>';
	
	dataInfo += '<li><a href="https://kitsu.io/anime/' + haveKitsuId(arr) + '" target="_blank" title="' + haveTheTitle(arr) + '">Kitsu URL</a></li>';
	dataInfo += '<li>Studio: ' + haveTheStudio(arr.included) + '</li>';
	writeDataInnerHtml('info_' + noSpace(anime), dataInfo);
}

function haveKitsuId(arr) {
	return arr.data[0].id;
}

function haveTheTitle(arr) {
	return arr.data[0].attributes.titles.en_jp;
}

function haveTheNumberOfEpisodes(arr) {
	return arr.data[0].attributes.episodeCount;
}

function haveThePremiereDate(arr) {
	return arr.data[0].attributes.startDate;
}

function haveTheStudio(arr) {
	var studioID = "";

	//only select Anime Productions, it's where there is the studio
	var productions = getObjects(arr,'type','animeProductions');

	// search the id of the studio
	for(let production of productions) {
		if(production.attributes.role === 'studio') {
			studioID = production.relationships.producer.data.id;
			break;
		}
	}

	//only select where the studioID is node (but return more than 1 node)
	var studios = getObjects(js,'id', studioID);

	for(let studio of studios){
		//only one node should have the attributes.name of the studio
		if(typeof studio.attributes !== 'undefined') {
			return studio.attributes.name;
		}
	}
}
