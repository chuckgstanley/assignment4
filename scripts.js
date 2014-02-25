/**
 * @author
 */

console.log("hi there");

//unempdata is local name for data file

function dataLoaded(UNEMPDATA) {

	console.log(UNEMPDATA);

	var myObsData = UNEMPDATA.observations;

	//constructing an array of arrays from unempdata

	

	//I need headers to be the first array

	var headerArray = ["Date", "Value"];
	//first parameter is starting point,
	// second, specify ending point
	
	var myDataArray = [headerArray];
	

	for (var i = 0; i < myObsData.length; i++) {

		//create reference to current object in list

		var currObj = myObsData[i];

		var currArray = [currObj.date, Number(currObj.value)];

		myDataArray.push(currArray);

	}//End of loop

	console.log(myDataArray);

	//feed data to visualization library
	var myDataTable = google.visualization.arrayToDataTable(myDataArray);

	var myChart = new google.visualization.LineChart(document.getElementById('chart_div'));
	myChart.draw(myDataTable);
}

function googleLoaded() {

	console.log("google loaded");

	$.get("UEMP270V_data.json", dataLoaded, "json");

}

function pageLoaded() {

	console.log("Page Loaded!");

	//load Google Viz Library
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "googleLoaded"
	});

}


$(document).ready(pageLoaded);
