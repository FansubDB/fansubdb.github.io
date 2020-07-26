/* Some defaults functions */
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function copyToClipboard(text) {
	window.prompt("Copy to clipboard: Ctrl+C, Enter", decodeHTMLEntities(text));
}

function encodeText(text) {
	return encodeURIComponent(text);
}

function decodeText(text) {
	return decodeURIComponent(text);
}

function encodeHTMLEntities(text) {
	return encodeText(he.encode(text));
}

function decodeHTMLEntities(text) {
	return he.decode(decodeText(text));
}

function writeMessage(id, string) {
	document.getElementById(id).innerHTML = string;
}

function removeTag(id) {
	document.getElementById(id).innerHTML = '';
}

function updateButton(id){
	document.getElementById(id).className = "btn btn-default btn-outline-dark";
}

function isActive(id){
	document.getElementById(id).className += " active";
}

function writeDataInnerHtml(id, data) {
	let selectedElement = document.getElementById(id);
	let newSelectedElement = selectedElement.cloneNode(false);
	newSelectedElement.innerHTML = data;
	selectedElement.parentNode.replaceChild(newSelectedElement, selectedElement);
}

function cantLoadImage(source, title) {
	if (source === "") {
		writeLog("> No picture to display for: " + decodeText(title));
	}
	else {
		writeLog("> Fail to load picture of: " + decodeText(title));
	}

	return true;
}

function writeLog(text) {
	if (DEBUG) {
		console.log(text);
	}
}

function warningTemplate(text) {
	return '<div class="alert alert-warning"><a href="#" class="close" data-dismiss="alert">&times;</a>' + text + '</div>';
}

function infoTemplate(text) {
	return '<div class="alert alert-info"><a href="#" class="close" data-dismiss="alert">&times;</a>' + text + '</div>';
}
