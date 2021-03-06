const express = require('express')
const lib = require('./indexlib.js');
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 5000))
//require(/indexxx.js)

const REQUIRE_AUTH = true
const AUTH_TOKEN = 'an-example-token'

app.get('/', function (req, res) {
  res.send('Use the /webhook endpoint.')
})
app.get('/webhook', function (req, res) {
  res.send('You must POST your request')
})

app.post('/webhook', function (req, res) {
  // we expect to receive JSON data from api.ai here.
  // the payload is stored on req.body
  console.log(req.body)

  // we have a simple authentication
 

  // and some validation to

  // the value of Action from api.ai is stored in req.body.result.action
  //console.log('* Received action -- %s', req.body.result.action)

  // parameters are stored in req.body.result.parameters
  var userName = 'sandeep'
 var number1= 2
var product1 = 'Dell Inspiron 3565'
var product2 = 'ThinkPad L380'
var text1 = 'You have' + number1  + 'orders in your order list, and the details are' + product1 + 'it will be delivered at your shipping address in 5 days.'

//var text2 = '' + product2  +  'be delivered deliver at your shipping address in 3 days'

//var text3 = 'We have fantastic deals available on eBook reader would you like to check it?'

//var webhookReply =text1+text2+text3
  var webhookReply = 'hello world'
  
//var webhookReply1 = 'You have' +  number1 + 'orders in your order list, and the details are' : + 
 //product1 + 'it will be delivered at your shipping address in' + number2 + 'days'.
  //console.log(webhookReply1)

  // the most basic response
  res.status(200).json({
    source: 'webhook',
    speech: webhookReply,
    displayText: webhookReply
  })
})


app.post('/Hello',(req,res)=>{

let response = 'This is a sample response from your webhook!' //Default response from the webhook to show it’s working

res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type

return res.send(JSON.stringify({ "speech": response, "displayText": response}));});

console.log()


app.post('/v2/Hello',(req,res)=>{
let response = "This is a sample response from your webhook!";//Default response from the webhook to show it’s working
  let orderNum= 2
  let product1 = 'Dell Inspiron 3565'
let product2 = 'ThinkPad L380'
let order_details = 'You have '  + ' ' + orderNum  +  ' ' + 'orders in your order list, and the details are ' + ' ' + product1 + 'it will be delivered at your shipping address in 5 days. ' + ' ' + product2  +  'be delivered deliver at your shipping address in 3 days ' + ' ' + 'We have fantastic deals available on eBook reader would you like to check it?'
let text3 = 'We have fantastic deals available on eBook reader would you like to check it?'

//let webhookReply =order_details
  //let webhookReply ='helo world sandeep'

//updateFromDate(duration);
//var OmnitureAPI = require('node-omniture-api')
var omniture = new lib('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
var pageViews;


					var requestData = {
						"reportDescription": {

							"reportSuiteID": "geo1xxlon-we-retail-demo",
							
							"metrics": "[{ id: 'pageviews' }]"

						}
					}
          
          omniture.queueAndFetchReport(requestData, function (success, data) {
		if (success) {

			pageViews = data.report.totals[0];
			webhookReply = pageViews;
		} else {
			pageViews = data;
			webhookReply = pageViews;
		}
	});
					//updatePageViews(requestData,context,duration);
  
let responseObj={
     "fulfillmentText":response
    ,"fulfillmentMessages":[
        {
            "text": {
                "text": [
                   webhookReply
                ]
            }
        }
    ]
    ,"source":""
}
return res.json(responseObj);});

app.listen(app.get('port'), function () {
  console.log('* Webhook service is listening on port:' + app.get('port'))
})
