const express = require('express');
const app = express();
const port = 3333; 
var path = require("path");
// const {check,validationResult} = require('express-validator');
const {fork} = require('child_process');
// const {init} = require('../main/init.js');
// const chalk = require('chalk');
//temp database//
var Scan1 = {
	name:"Scan1",
	service:"AWS",
	benchmark:"CisV13",
	lastModified:'-',
	status:'waiting',
	}

var Scan2 = {
	name:"Scan2",
	service:"AWS",
	benchmark:"CisV14",
	lastModified:'-',
	status:'waiting',
	}

var tempScan =[]
tempScan.push(Scan1);
tempScan.push(Scan2);

var ScanResult = [] 
//temp database//

app.get('/testqueue', [
], compile);
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname+'/../view'});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/newScan',(req,res) => {
    res.sendFile('newScan.html', {root: __dirname+'/../view',}); 
})

app.get('/aws/config',(req,res) => {
    res.sendFile('awsConfig.html', {root: __dirname+'/../view'}); 
})

app.get('/azure/config',(req,res) => {
    // res.sendFile('newScan.html', {root: __dirname+'/../view'}); 
	res.send("Coming Soon... ?")
})
const process = fork('./queue_test/check.js');
app.get('/queue/cisv13',[],getcisv13);
app.get('/queue/cisv14',[],getcisv14);
app.get('/queue/control',[],getcontrol);
/*
TODO: -> req : {submitionId, userId, input, output, scorePerCase, sourceCode}
*/

function getcisv13(req, res, next){
	console.log("Long request");
	process.send({name: 'cisv13',benchmark:'benchmark.cis_v130'})
	res.send({
		status:'ok',
	});
}

function getcisv14(req, res, next){
	console.log("Long request");
	process.send({name: 'cisv14',benchmark:'benchmark.cis_v140'})
	res.send({
		status:'ok',
	});
}

function getcontrol(req,res,next){
	console.log("new request");
	process.send({name:'control',benchmark:'control.cis_v140_2_1_1'})
	res.send({
		statut:'ok',
	})
}
function compile(req, res, next) {
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	return res.status(422).json({
	// 		//errors: errors.array()
	// 		'status': "err",
	// 		'error': 'Reject, json wrong'
	// 	})
	// }
	console.log("new request");
	process.send();
	process.
	res.send({
		status: 'ok',
	});
}

async function start() {
	// await init();
	// app.listen(3456, () => {
	// 	console.log(
	// 		chalk.blueBright(
	// 			'CompilerServer at port 4906.\nGraderServer at port 3456.'
	// 		)
	// 	);
	// });
    app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
        console.log(`Now listening on port ${port}`); 
    });
}

start();

