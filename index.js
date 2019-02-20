const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 5000))

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

//var tex2 = product2 +  'be delivered deliver at your shipping address in 3 days'.

// var text3 = We have fantastic deals available on eBook reader would you like to check it?

var webhookReply = text1 
  
  
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
let responseObj={
     "fulfillmentText":response
    ,"fulfillmentMessages":[
        {
            "text": {
                "text": [
                    "Hello I m Responding to intent"
                ]
            }
        }
    ]
    ,"source":""
}
return res.json(response);});

app.listen(app.get('port'), function () {
  console.log('* Webhook service is listening on port:' + app.get('port'))
})
