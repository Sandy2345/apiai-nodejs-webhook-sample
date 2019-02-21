var OmnitureAPI = require('node-omniture-api')
var omniture = new OmnitureAPI('<user-credentials>', '<token>');
var pageViews;
var duration;
var dateFrom = new Date();
var dateTo = new Date();

function updatePageViews(requestData,context,duration) {
	omniture.queueAndFetchReport(requestData, function (success, data) {
		if (success) {

			pageViews = data.report.totals[0];
			console.log(data.report.totals[0]);
			console.log(pageViews);
			context.succeed(generateResponse(buildSpeechletResponse("we have " + pageViews + " page views " + duration, false)))
		} else {
			pageViews = data;
			console.error(data);
			context.succeed(generateResponse(buildSpeechletResponse("Sorry, Adobe Analytics experienced an error. Please try again later." + pageViews, false)))
		}
	});
}


function updateFromDate(duration) {
	if (duration == 'this year') {
		dateFrom = new Date();
		dateFrom.setMonth(0);
		dateFrom.setDate(01);
	} else if (duration == 'last year') {
		dateFrom = new Date();
		dateFrom.setYear(dateFrom.getFullYear() - 1);
	} else if (duration == 'this month') {
		dateFrom = new Date();
		dateFrom.setDate(01);
	} else if (duration == 'last month') {
		dateFrom = new Date();
		dateFrom.setMonth(dateFrom.getMonth() - 1);
	} else if (duration == 'this week') {
		dateFrom = new Date();
		dateFrom.setDate(dateFrom.getDate() - dateFrom.getDay());
	} else if (duration == 'last week') {
		dateFrom = new Date();
		dateFrom.setDate(dateFrom.getDate() - 7);
	}
}

exports.handler = (event, context, callback) => {
	
	switch (event.request.type) {
		case "LaunchRequest":
			context.succeed(generateResponse(buildSpeechletResponse("Welcome to Adobe Analytics..How can I help you?.", false)))
			break;
		case "IntentRequest":
			switch (event.request.intent.name) {
				case "OneshotReportIntent":
					duration = event.request.intent.slots.Duration.value;
					updateFromDate(duration);
					var requestData = {
						"reportDescription": {

							"reportSuiteID": "geo1xxlon-we-retail-demo",
							"dateFrom": dateFrom.toISOString().slice(0, 10),
							"dateTo": dateTo.toISOString().slice(0, 10),
							"metrics": "[{ id: 'pageviews' }]"

						}
					}
					updatePageViews(requestData,context,duration);
					
					break;
				case "ReportSuiteSelectionIntent":
					
					var reportSuites = event.request.intent.slots.ReportSuite.value;
					context.succeed(generateResponse(buildSpeechletResponse("Hello World chirag 2 " + reportSuites, false)))
					break;
				case "PageViewsTodayIntent":
					duration = "today";
					requestData = {
						"reportDescription": {
							"source": "realtime",
							"reportSuiteID": "geo1xxlon-we-retail-demo",

							"metrics": "[{ id: 'pageviews' }]"

						}
					}
					updatePageViews(requestData,context,duration);
					
					break;
				case "ThankYouIntent":

					context.succeed(generateResponse(buildSpeechletResponse("My pleasure, have a fantastic day! ", true)))
					break;
				case "AMAZON.StopIntent":
					context.succeed(generateResponse(buildSpeechletResponse("Goodbye!", true)))
					break;
			}
			break;
	}
}


var buildSpeechletResponse = (outputText, shouldEndSession) => {
	return {
		outputSpeech: {
			type: "PlainText",
			text: outputText
		},
		shouldEndSession: shouldEndSession
	}
}
var generateResponse = (speechletResponse) => {
	return {
		version: "1.0",
		response: speechletResponse
	}
}