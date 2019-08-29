const express = require ("express"),
        app = express(),
        bodyParser = require("body-parser"),
        qs = require('querystring'),
        //http = require ("http"),
        https = require ("https"),
        axios = require('axios'),
        request = require('request').defaults({ rejectUnauthorized: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');

app.get('/', (req,res) =>{
    res.render('index');
});


/* request.post('https://sandbox-api.payosy.com/api/get_qr_sale', {
  json: {
    "totalReceiptAmount": 1000
  },
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'x-ibm-client-id': '436b9b1b-08a4-42da-b2dc-5567708e069b',
    'x-ibm-client-secret': 'U3uG0rH5gU4yK5kB1kI6qY7yL0tK2nC0nV2kD8aA6wN3dC1dD1'    
  }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
}) */

/* request.post('https://sandbox-api.payosy.com/api/payment', {
  json: {"data":{
    "returnCode":1000,
    "returnDesc":"OK",
    "QRdata":"000201530394954041000800201810200821929-08-2019 13:42:04830514-438609800-1000#8734EC436b9b1b08a442dab2dc5567708e069b890118405249838844secureqrsigniturewillbehereinthenearfuture1="
                }
        },
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'x-ibm-client-id': '436b9b1b-08a4-42da-b2dc-5567708e069b',
    'x-ibm-client-secret': 'U3uG0rH5gU4yK5kB1kI6qY7yL0tK2nC0nV2kD8aA6wN3dC1dD1'    
  }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
}); */


app.post('/odeme', (req,ress) => {
    console.log(req.body.tname);
    console.log(typeof parseInt(req.body.tname));
 request.post('https://sandbox-api.payosy.com/api/get_qr_sale', {
  json: {
    "totalReceiptAmount": parseInt(req.body.tname)
  },
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'x-ibm-client-id': '436b9b1b-08a4-42da-b2dc-5567708e069b',
    'x-ibm-client-secret': 'U3uG0rH5gU4yK5kB1kI6qY7yL0tK2nC0nV2kD8aA6wN3dC1dD1'    
  }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
  ress.render('response',{ body})
}); 
;
} );

app.post('/onayla', (req,ress)=>{
request.post('https://sandbox-api.payosy.com/api/payment', {
  json: {"data":{
    "returnCode":1000,
    "returnDesc":"OK",
    "QRdata": req.body.qr
                }
        },
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'x-ibm-client-id': '436b9b1b-08a4-42da-b2dc-5567708e069b',
    'x-ibm-client-secret': 'U3uG0rH5gU4yK5kB1kI6qY7yL0tK2nC0nV2kD8aA6wN3dC1dD1'    
  }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
  ress.send(body)
}); 

});

app.listen(3000, ()=> console.log('server running on port:3000'));