const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening
const axios = require('axios');
const bodyParser = require("body-parser");

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname+'/view'});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/aws/config',(req,res) => {
    res.sendFile('awsConfig.html', {root: __dirname+'/view'}); 
})

app.get('/azure/config',(req,res) => {
    // res.sendFile('newScan.html', {root: __dirname+'/../view'}); 
	res.send("Coming Soon... ?")
})

app.get('/newScan',(req,res) => {
    res.sendFile('newScan.html', {root: __dirname+'/view'}); 
})
app.get('/getcisv13',(req,res) => {

    res.sendFile('cisv13.json',{root: __dirname+'/steampipe-mod-aws-compliance'},function(err) {
        if (err) {
            console.log(err);
            res.send("Benchmark is running please wait..")
        }
        else {
            console.log('Sent:');
        }
    })

    
})

app.get('/getcisv14',(req,res) => {

    res.sendFile('cisv14.json',{root: __dirname+'/steampipe-mod-aws-compliance'},function(err) {
        if (err) {
            console.log(err);
            res.send("Benchmark is running please wait..")
        }
        else {
            console.log('Sent:');
        }
    })

    
})
app.get('/cisv13',(req,res) => {
    axios.get('http://localhost:3333/queue/cisv13')
  .then(response => {
    // res.sendFile('index.html', {root: __dirname+'/view'});
    res.redirect('/')
  })
  .catch(error => {
    console.log(error);
  });
})

app.get('/cisv14',(req,res) => {
    axios.get('http://localhost:3333/queue/cisv14')
  .then(response => {
    // res.sendFile('index.html', {root: __dirname+'/view'});
    res.redirect('/')
  })
  .catch(error => {
    console.log(error);
  });
})
const { spawn , exec } = require("child_process");
const { get } = require('http');
const { stdout, stderr } = require('process');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/', function(request, response){
//     response.sendFile(path.join(__dirname +'/../view/index.html'));
// });


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});