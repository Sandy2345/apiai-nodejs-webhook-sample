var OmnitureAPI = require('node-omniture-api')
var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
var pageViews;
var duration;
var dateFrom = new Date();
var dateTo = new Date();

function updatePageViews(requestData,context,duration) {
	omniture.queueAndFetchReport(requestData, function (success, data) {
		if (success) {

			pageViews = data.report.totals[0];
			
		} else {
			pageViews = data;
			
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

