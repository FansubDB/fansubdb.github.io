function readJsonFile(link, page, type = TV) {
	var req = new XMLHttpRequest();
	writeLog(new Date() + " - Loading data from JSON file <" + link + ">");
	req.open('GET', URL_DATA + link, true); //true for asynchronous

	req.onreadystatechange = function () {
		if (req.readyState == 4) { //4 == XMLHttpRequest.DONE ie8+
			if((req.status == 200) || (req.status == 304)) {
				writeLog(new Date() + " - Loading the");
				switch(page) {
				case HOME:
					writeLog("	HOME page");
					var objJson = JSON.parse(req.responseText);
					buildNavbar(objJson);
					buildHomePage(objJson);
					break;

				case ARCHIVE:
					writeLog("	ARCHIVE page");
					var objJson = JSON.parse(req.responseText);
					buildArchive(objJson.data);
					break;

				case SEASON:
					writeLog("	SEASON page");
					var objJson = JSON.parse(req.responseText);
					buildPage(objJson, type);
					break;

				default:
					writeLog("	DEFAULT switch of succeed to load data");
					break;
				}
			}
			else {
				writeLog(new Date() + " - Fail to load data");
				switch(page) {
				case HOME:
					writeLog("	of the HOME page");
					writeMessage('navbar', 'Fail to load data…');
					break;

				case ARCHIVE:
					writeLog("	of the ARCHIVE page");
					writeMessage('archive', 'Fail to load data…');
					break;

				case SEASON:
					writeLog("	of the SEASON page");
					writeMessage('tableAnime', 'Fail to load data…');
					break;

				default:
					writeLog("	of the DEFAULT switch. Weird!");
					break;
				}
			}
		}
	};
	req.send(null);
}
