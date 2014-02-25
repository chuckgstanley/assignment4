/**
 * @author
 */

// I want to know that my scripts are showing up on html
console.log("hi there");

//unempdata is local name for data file
function dataLoaded(UNEMPDATA) {

	//I want to know that my function is calling back
	console.log(UNEMPDATA);
	
	//constructing an array of arrays from unempdata
	
	//isolate "observations" from UNEMPDATA into new object "myObsData" 
	//to build Array from
	var myObsData = UNEMPDATA.observations;

	//I need headers to be the first array

	var headerArray = ["Date", "Value"];
	
	//headerArray ("date", "value" will appear first in myDataArray)
	var myDataArray = [headerArray];
	
	//create a loop to populate myDataArray with Data
	//first parameter is starting point,
	// second, specify ending point
	
	for (var i = 0; i < myObsData.length; i++) {

		//define the current object as variable "i" from myObsData

		var currObj = myObsData[i];
		
		//arrange the sorted dates and values from myObsData 
		//into a new array "currArray"
		
		var currArray = [currObj.date, Number(currObj.value)];

		//Send "currArray" to "myDataArray"
		myDataArray.push(currArray);

	}//End of loop
	
	//Log "myDataArray" to show that the array works
	console.log(myDataArray);

	//feed data to visualization library
	var myDataTable = google.visualization.arrayToDataTable(myDataArray);
	
	//add chart to div on html [must create "chart_div" in html file]
	var myChart = new google.visualization.LineChart(document.getElementById('chart_div'));
	myChart.draw(myDataTable);
}

function googleLoaded() {
	// I want to know that google loaded is calling back
	console.log("google loaded");
	
	//I want to import data from my Unemployment json file
	$.get("UEMP270V_data.json", dataLoaded, "json");

}

function pageLoaded() {
	//I want to know that my pageLoaded function is calling back
	//and my page is finished loading
	console.log("Page Loaded!");

	//load Google Viz Library and init. google loaded function
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "googleLoaded"
	});

}

// Init. pageLoaded function once page is loaded
$(document).ready(pageLoaded);
