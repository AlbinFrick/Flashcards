let dataArray = [];

window.onload = function loadSets() {
	fetch('/set/all')
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
			buildSets(myJson);
		});
}

function buildSets(data) {
	let div;
	for(let i = 0; i < data.length; i++) {
		dataArray.push(data[i]);
		div = document.createElement("div");

		let title = data[i].name;
		let date = data[i].date;
		let year = date.substring(0,4);
		let month = date.substring(5,7);
		let day = date.substring(8,10);
		date = day + "/"+ month + "-" + year;
		let course = data[i].course;
		let nr_cards = data[i].nr_cards;
		let color = data[i].color;

		div.innerHTML = "<h1 id=\"title\">" + title + "</h1>" +
			"<p id=\"meta\">  Antal kort: " + nr_cards + "<br/>" +
			"Kurs:  " + course + "<br />" +
			"Datum: " + date + " <br />";

		div.className = "flashcardSet";
		div.setAttribute("id", i);
		div.addEventListener("click", function(event){
			showMoreInfo(event);
		});

		//div.style.backgroundColor = color;

		document.getElementById("flashcardSetContainer").appendChild(div);
		colorTag = document.createElement("div");
		colorTag.id = "colorTag";
		colorTag.style.backgroundColor = color;
		document.getElementById(i).appendChild(colorTag);
	}
}

function getJSONP(url, success) {

	var ud = '_' + +new Date,
		script = document.createElement('script'),
		head = document.getElementsByTagName('head')[0]
			|| document.documentElement;

	window[ud] = function(data) {
		head.removeChild(script);
		success && success(data);
	};

	script.src = url.replace('callback=?', 'callback=' + ud);
	head.appendChild(script);
}

function showMoreInfo(event) {
	createClosePopUpDiv();
	let index;
	if(isNaN(event.target.id )) {
			index = event.target.parentElement.id;
	} else {
		index = event.target.id;
	}

	let div = document.createElement("div");
	div.id = "popUp";

	console.log("index: " + index);
	let setData = dataArray[index];

	let date = setData.date;
	let year = date.substring(0,4);
	let month = date.substring(5,7);
	let day = date.substring(8,10);
	date = day + "/"+ month + "-" + year;

	div.setAttribute("style", "background: " + setData.color);
	div.setAttribute("class", "flashcardSet");
	div.innerHTML = "<h1 id=\"title\">" + setData.name + "</h1>" +
		"<p id=\"meta\">  Antal kort: " + setData.nr_cards + "<br/>" +
		"Kurs:  " + setData.course + "<br />" +
		"Datum: " + date + " <br />";
	document.getElementById("content").appendChild(div);



	let playSet = document.createElement("div");
	playSet.id = "playDiv";
	playSet.innerHTML = "<a href=\"pages/play.html?set_name=" + dataArray[index].name + "\"><div id=\"playButton\" >\n" +
						"<img src=\"Images/triangleWhite.png\" alt=\"Add flashcard\" \">\n" +
						"</div></a>";
	document.getElementById("popUp").appendChild(playSet);

}

function createClosePopUpDiv() {
	let div = document.createElement("div");
	div.id = "closePopUp";
	div.addEventListener("click", closePopUp);
	document.getElementById("content").appendChild(div);
}

function closePopUp() {
	document.getElementById("closePopUp").remove();
	document.getElementById("popUp").remove();
}