let map;

function initMap() {
	// Getting the averages of all the coordinates to find a center point to center the map on.
	console.log(localStorage.getItem("GPTResponseJSON"))
	var obj = JSON.parse((localStorage.getItem("GPTResponseJSON")))
	console.log(obj)
	var features = [];
	var avgX = 0;
	var avgY = 0;
	for (var i = 0; i < obj["Itinerary"].length; i++) {
		let lat = obj["Itinerary"][i]["Latitude"];
		let lng = obj["Itinerary"][i]["Longitude"];
		avgX += lat;
		avgY += lng;
		features.push({
			position: new google.maps.LatLng(lat, lng),
			type: "info",
		});
	}
	avgX = avgX / obj["Itinerary"].length;
	avgY = avgY / obj["Itinerary"].length;
	map = new google.maps.Map(document.getElementById("map"), {
		center: new google.maps.LatLng(avgX, avgY),
		zoom: 6,
	});

	// making the markers
	for (let i = 0; i < features.length; i++) {
		const marker = new google.maps.Marker({
			position: features[i].position,
			label: "" + (i + 1),
			map: map,
		});
		// Making an activities string ordered list with a bullet point for each item in the JSON activities array.
		var activitiesList = "<ul>";
		for (let j = 0; j < obj["Itinerary"][i]["Activities"].length; j++) {
			activitiesList += "<li>" + obj["Itinerary"][i]["Activities"][j] + "</li>";
		}
		activitiesList += "</ul>";
		// Making the content of the Info Window.
		const contentString =
			'<div id="content">' +
			'<div id="siteNotice">' +
			"</div>" +
			// Title text
			'<h2 id="firstHeading" class="firstHeading">' +
			"Day " +
			obj["Itinerary"][i]["Day"] +
			": " +
			obj["Itinerary"][i]["City"] +
			"</h2>" +
			// Body text
			'<div id="bodyContent">' +
			"<p><b>Activities:</b></p>" +
			activitiesList +
			"</div>" +
			"</div>";
		// Making the info window object.
		const infowindow = new google.maps.InfoWindow({
			content: contentString,
			ariaLabel: obj["Itinerary"][i]["City"],
		});
		// Connecting the info window to the Marker
		marker.addListener("click", () => {
			infowindow.open({
				anchor: marker,
				map,
			});
		});
	}
}
window.initMap = initMap;